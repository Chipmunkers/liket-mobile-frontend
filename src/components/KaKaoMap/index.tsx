'use client';

import { ReactNode, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';

interface KaKaoMapProps {
    children?: ReactNode;
}

declare const window: {
    kakao: any;
} & Window;

const { lng, lat } = {
    lng: 127.0495556,
    lat: 37.514575,
};

const KaKaoMap = ({ children }: KaKaoMapProps) => {
    const [bound, setBound] = useState<{ ha: number; oa: number; pa: number; qa: number }>();
    const [level, setLevel] = useState(4);
    const [map, setMap] = useState();
    const [prevClusteredOverlays, setPrevClusteredOverlays] = useState<any[]>([]);
    const [prevMarkers, setPrevMarkers] = useState<any[]>([]);

    const [clusteredContentList, setClusteredContentList] = useState<any[]>([]);
    const [contentList, setContentList] = useState<any[]>([]);
    const [markerList, setMarkerList] = useState<any[]>([]);
    const [clusteredOverlayList, setClusteredOverlayList] = useState<any[]>([]);

    const { data: clusteredMap } = useQuery({
        queryKey: ['clustered-map', bound, level],
        queryFn: async () => {
            if (level <= 5) return null;

            const { data } = await axiosInstance.get(
                `/apis/map/culture-content/clustered/all?` +
                    `top-x=${bound?.ha}&` +
                    `top-y=${bound?.pa}&` +
                    `bottom-x=${bound?.oa}&` +
                    `bottom-y=${bound?.qa}&` +
                    `level=${level}`
            );
            return { data };
        },
        enabled: () => {
            return !!bound && !!level;
        },
    });

    const { data: contentData } = useQuery({
        queryKey: ['map-contents', bound, level],
        queryFn: async () => {
            if (level > 5) return null;

            const { data } = await axiosInstance.get(
                `/apis/map/culture-content/all?` + `top-x=${bound?.ha}&` + `top-y=${bound?.pa}&` + `bottom-x=${bound?.oa}&` + `bottom-y=${bound?.qa}&`
            );
            return { data };
        },
        enabled: () => {
            return !!bound && !!level;
        },
    });

    // * 컨텐츠 데이터 받아온 후 컨텐츠 데이터 정제
    // *  1. 범위에서 벗어난 마커 데이터 정리
    // *  2. 범위에서 벗어난 컨텐츠 데이터 정리
    useEffect(() => {
        if (!contentData || !bound) return;

        const queryContentList: any[] = contentData.data.contentList;

        const idxList = contentList.map((content) => content.idx);

        // * 범위 벗어난 마커 삭제하기
        markerList
            .filter(
                (elem) =>
                    !(
                        elem.marker.getPosition().Ma >= bound.qa &&
                        elem.marker.getPosition().Ma <= bound.pa &&
                        elem.marker.getPosition().La >= bound.ha &&
                        elem.marker.getPosition().La <= bound.oa
                    )
            )
            .forEach((elem) => elem.marker.setMap(null));

        // * 범위에 들어온 마커로만 다시 마커 설정하기
        setMarkerList(
            markerList.filter(
                (elem) =>
                    elem.marker.getPosition().Ma >= bound.qa &&
                    elem.marker.getPosition().Ma <= bound.pa &&
                    elem.marker.getPosition().La >= bound.ha &&
                    elem.marker.getPosition().La <= bound.oa
            )
        );

        // * 보유하고 있는 컨텐츠 목록 갱신하기
        setContentList([
            // * 범위에 벗어난 컨텐츠 삭제하기
            ...contentList.filter(
                (content) =>
                    content.location.positionX <= bound.oa &&
                    content.location.positionX >= bound.ha &&
                    content.location.positionY <= bound.ha &&
                    content.location.positionY >= bound.qa
            ),
            ...queryContentList.filter((content) => !idxList.includes(content.idx)),
        ]);
    }, [contentData]);

    // * 컨텐츠 데이터 정제한 후
    // *  1. 마커 데이터 뿌려주기
    useEffect(() => {
        const imgUrl = 'https://liket.s3.ap-northeast-2.amazonaws.com/map-marker/marker.svg';

        const markerIdxs = markerList.map((marker) => marker.idx);

        let addedMarkers: any[] = [];
        for (const content of contentList) {
            // * 이미 마커로 존재하는 경우 마커로 추가하지 않기
            if (markerIdxs.includes(content.idx)) continue;

            const imageSize = new window.kakao.maps.Size(40, 50);
            const markerImage = new window.kakao.maps.MarkerImage(imgUrl, imageSize);
            const marker = new window.kakao.maps.Marker({
                map,
                position: new window.kakao.maps.LatLng(content.location.positionY, content.location.positionX),
                image: markerImage,
            });

            addedMarkers.push({
                idx: content.idx,
                marker,
            });
        }
        setMarkerList([...markerList, ...addedMarkers]);
    }, [contentList]);

    useEffect(() => {
        // * 기존 오버레이 전부 지우기
        // * 오버레이란 클러스터링된 데이터를 표시하기 위해서 카카오 맵 위에 [동그라미 + 숫자]를 띄운 것을 의미합니다.
        for (const prevOverlay of prevClusteredOverlays) {
            prevOverlay.setMap(null);
        }
        setPrevClusteredOverlays([]);

        if (!clusteredMap) return;

        // * 기존 마커 전부 지우기
        for (const marker of prevMarkers) {
            marker.setMap(null);
        }
        setPrevMarkers([]);

        // * 현재 오버레이들 목록을 담을 배열 -> 기존 오버레이를 지우는 것에 사용됨
        const overlays: any[] = [];

        // * 클러스터 숫자 표시할 오버레이 출력
        for (const clusteredContent of clusteredMap.data.clusteredContentList) {
            const { lng, lat, count } = clusteredContent;

            // * 오버레이 생성
            const content = `<div style="border: 2px solid black; width: 40px; height: 40px;" />${count}<div>`;
            const position = new window.kakao.maps.LatLng(lat, lng);
            const overlay = new window.kakao.maps.CustomOverlay({
                position: position,
                content: content,
            });

            overlays.push(overlay);

            overlay.setMap(map);
        }

        // * 다음 드래그 또는 확대 시 기존 오버레이를 지우기 위해서 저장해놓는 코드
        setPrevClusteredOverlays(overlays);
    }, [clusteredMap]);

    useEffect(() => {
        const $mapScript = document.createElement('script');
        $mapScript.async = false;
        $mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_API_KEY}&autoload=false`;
        document.head.appendChild($mapScript);

        const onLoadMap = () => {
            window.kakao.maps.load(() => {
                var container = document.getElementById('map');
                var options = {
                    center: new window.kakao.maps.LatLng(lat, lng),
                    level,
                };

                const map = new window.kakao.maps.Map(container, options);

                setMap(map);
                setBound(map.getBounds());
                // TODO: 지도 이동과 관련한 상세 로직 구현
                window.kakao.maps.event.addListener(map, 'dragend', async (data: any) => {
                    const bound = map.getBounds();

                    setBound(bound);
                });

                window.kakao.maps.event.addListener(map, 'zoom_changed', (data: any) => {
                    setLevel(map.getLevel());
                });
            });
        };

        $mapScript.addEventListener('load', onLoadMap);
    }, []);

    return (
        <div id="map" className="grow relative w-[100%]">
            {children}
        </div>
    );
};

export default KaKaoMap;
