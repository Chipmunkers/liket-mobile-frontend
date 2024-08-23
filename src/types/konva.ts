import { ShapeConfig } from "konva/lib/Shape";
import { RequireProperty } from "./common";

/**
 * @deprecated
 */
export type StrictShapeConfig = RequireProperty<ShapeConfig, "id">;
