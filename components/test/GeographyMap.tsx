"use client";

import { useId, useMemo } from "react";
import mapData from "@/data/spanish-map.json";
import { mapViews, placeById, studyPlaces, type MapView } from "@/data/spanish-study";

type Props = {
  view: MapView;
  explore: boolean;
  selected?: string;
  correct?: string;
  wrong?: string;
  disabled?: boolean;
  onPick: (id: string) => void;
};

const project = ([longitude, latitude]: readonly [number, number]) => [(longitude + 180) * 10, (90 - latitude) * 10];

export default function GeographyMap({ view, explore, selected, correct, wrong, disabled, onPick }: Props) {
  const clipId = useId().replace(/:/g, "");
  const currentView = mapViews.find((item) => item.id === view) ?? mapViews[0];
  const [west, south, east, north] = currentView.bounds;
  const [x, y] = project([west, north]);
  const width = (east - west) * 10;
  const height = (north - south) * 10;
  const markerRadius = Math.min(width / 53, height / 32);
  const shapes = useMemo(() => mapData.shapes.filter((shape) => shape.bounds[0] < east && shape.bounds[2] > west && shape.bounds[1] < north && shape.bounds[3] > south), [west, east, north, south]);
  const visiblePlaces = studyPlaces.filter((place) => {
    const [longitude, latitude] = place.point;
    if (longitude < west || longitude > east || latitude < south || latitude > north) return false;
    // Close views make the small mainland countries and islands usable.
    return view !== "americas" || place.region !== "central" || ["CUB", "GOM", "CAR"].includes(place.id);
  });

  function choose(id: string) { if (!disabled) onPick(id); }

  function fillFor(id: string): string {
    if (id === correct) return "#15803d";
    if (id === wrong) return "#b91c1c";
    if (id === selected && explore) return "#60a5fa";
    return placeById.get(id)?.topic === "spanish" ? "#2264c4" : "#272a30";
  }

  return (
    <svg viewBox={`${x} ${y} ${width} ${height}`} role="group" aria-label={`${currentView.label} map`} className="h-[370px] w-full touch-manipulation sm:h-[470px] lg:h-[470px]" preserveAspectRatio="xMidYMid meet">
      <defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>
      <g clipPath={`url(#${clipId})`}>
        <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.6" vectorEffect="non-scaling-stroke" aria-hidden="true">
          {Array.from({ length: 37 }, (_, i) => <line key={`lon-${i}`} x1={i * 100} x2={i * 100} y1="0" y2="1800" />)}
          {Array.from({ length: 19 }, (_, i) => <line key={`lat-${i}`} x1="0" x2="3600" y1={i * 100} y2={i * 100} />)}
        </g>
        {shapes.map((shape) => {
          const place = placeById.get(shape.id);
          const number = studyPlaces.findIndex((item) => item.id === shape.id) + 1;
          return <path key={shape.id} d={shape.d} fill={fillFor(shape.id)} fillRule="evenodd" stroke={shape.id === correct ? "#86efac" : shape.id === wrong ? "#fca5a5" : "#b6bfcd"} strokeOpacity={place ? "0.85" : "0.4"} strokeWidth={shape.id === correct || shape.id === selected ? "1.6" : "0.8"} vectorEffect="non-scaling-stroke" role="button" tabIndex={-1} aria-label={explore ? place?.spanish ?? shape.name : place ? `Map location ${number} outline` : `Other country outline: ${shape.name}`} aria-disabled={disabled} onClick={() => choose(shape.id)} className={disabled ? "" : "cursor-pointer hover:brightness-125"} />;
        })}
        {visiblePlaces.map((place) => {
          const [cx, cy] = project(place.point);
          const number = studyPlaces.indexOf(place) + 1;
          const isWater = place.topic === "water";
          const isCity = place.id === "MIA";
          const highlight = place.id === correct ? "#15803d" : place.id === wrong ? "#b91c1c" : place.id === selected && explore ? "#2563eb" : isWater ? "#0b2631" : "#0a0a0a";
          return <g key={place.id} role="button" tabIndex={disabled ? -1 : 0} aria-label={explore ? place.spanish : `Map location ${number}`} aria-disabled={disabled} data-testid={`map-marker-${place.id}`} onClick={() => choose(place.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(place.id); } }} className={disabled ? "" : "cursor-pointer outline-none focus-visible:opacity-60"}>
            {explore && <title>{place.spanish}</title>}
            <circle cx={cx} cy={cy} r={markerRadius * 1.5} fill="transparent" />
            <circle cx={cx} cy={cy} r={markerRadius} fill={highlight} stroke={isWater ? "#67e8f9" : isCity ? "#fbbf24" : "#d0d8e5"} strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray={isWater ? "3 2" : undefined} />
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize={markerRadius * 1.06} fontFamily="var(--font-geist-mono), monospace" pointerEvents="none">{number}</text>
          </g>;
        })}
      </g>
    </svg>
  );
}
