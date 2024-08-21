import { RequireProperty } from "@/shared/types/util";
import { ShapeConfig } from "konva/lib/Shape";

export type StrictShapeConfig = RequireProperty<ShapeConfig, "id">;
