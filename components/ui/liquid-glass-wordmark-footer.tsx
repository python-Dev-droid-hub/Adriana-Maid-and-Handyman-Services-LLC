"use client";
import { useEffect, useId, type RefObject, useState, useRef, type CSSProperties, type ReactNode, useLayoutEffect, type FormEvent } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./liquid-glass-wordmark-footer.css";

/**
 * Liquid Glass Footer by Troy Lorents / Automate Flows.
 * Supply groups, copy, branding and an optional onSubscribe callback.
 * Glass properties: blur 0..40, opacity .04...95, saturation .5..2,
 * tint hex, edge 0..1, distortion 0..60. motionIntensity and rippleStrength: 0..1.5.
 * Set rippleStrength to 0 to keep the droplet/edges without click ripples.
 * Set motion to false to disable spatial motion. System reduced motion is respected.
 * theme omitted inherits host semantic variables; light/dark are optional presets.
 * Leave at least 32px surrounding space for elastic edges. Native input is not captured.
 * Dependencies: React, lucide-react, gsap, @gsap/react.
 * SVG backdrop displacement is Chromium-only; other engines keep CSS glass.
 * Links and subscription logic are supplied by the consumer, with no service calls inside.
 */
/** The displacement map samples the actual DOM backdrop in Chromium.
 * Other engines keep CSS glass plus WebGL lighting. All layers leave text crisp.
 * Normal maps rebuild on layout changes; no permanent animation loop runs.
 */
function useGlassOptics(scope: RefObject< HTMLDivElement | null>) {
  const key = useId().replace(/[^a-zA-Z0-9]/g, "");
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const supportsSVGBackdrop = /Chrome|Chromium|Edg/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0"); svg.setAttribute("aria-hidden", "true");
    svg.style.position = "absolute"; svg.style.pointerEvents = "none";
    const defs = document.createElementNS(ns, "defs"); svg.append(defs); root.append(svg);
    const surfaces = Array.from(root.querySelectorAll< HTMLElement>('.g-material:not([data-glass-optics="elastic"])'));

    const sizes = new Map< HTMLElement, string>();
    const timers = new Map< HTMLElement, ReturnType< typeof setTimeout>>();
    const build = (el: HTMLElement) => {
      if (!supportsSVGBackdrop) return;
      const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
      if (!w || !h) return;
      const style = getComputedStyle(el);
      const strength = parseFloat(style.getPropertyValue("--glass-distortion")) || 0;
      const index = surfaces.indexOf(el), id = `glass-optics-${key}-${index}`;
      const nav = el.closest< HTMLElement>(".g-nav--notched");
      const isNotched = !!nav && el.classList.contains("g-nav-surface");
      const marker = nav?.querySelector< HTMLElement>(".g-nav-indicator");
      const center = marker ? new DOMMatrixReadOnly(getComputedStyle(marker).transform).m41 : w/2;
      const count = nav?.querySelectorAll(".g-nav-links>a").length || 5;
      const scoop = Math.min(55, (w-24)/count*.72, center-4, w-center-4);
      const signature = [w,h,strength,isNotched ? center : 0].join(":");
      if (sizes.get(el) === signature) return;
      sizes.set(el, signature);
      defs.querySelector(`[id="${id}"]`)?.remove();
      const radius = Math.min(parseFloat(style.borderTopLeftRadius) || 26, w/2, h/2);
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(w*.5); canvas.height = Math.ceil(h*.5);
      const ctx = canvas.getContext("2d"); if (!ctx) return;
      const pixels = ctx.createImageData(canvas.width,canvas.height), data = pixels.data;
      const rect = (x: number, y: number, hw: number, hh: number, r: number) => {
        const qx=Math.abs(x)-hw+r, qy=Math.abs(y)-hh+r;
        return Math.hypot(Math.max(qx,0),Math.max(qy,0))+Math.min(Math.max(qx,qy),0)-r;
      };
      const distance = (x: number, y: number) => {
        if (!isNotched) return rect(x-w/2,y-h/2,w/2,h/2,radius);
        const bowl=1-Math.min(Math.abs(x-center)/Math.max(scoop,1),1)**2;
        return Math.max(rect(x-w/2,y-57,w/2,29,29),28+36*bowl*bowl-y);
      };
      const bevel = Math.min(18,h*.25);
      for (let py=0;py<canvas.height;py++) for(let px=0;px<canvas.width;px++) {
        const x=(px+.5)*w/canvas.width, y=(py+.5)*h/canvas.height, d=distance(x,y);
        const bend=d<0 ? Math.sin(Math.min(1,-d/bevel)*Math.PI) : 0;
        const nx=(distance(x+1,y)-distance(x-1,y))*.5, ny=(distance(x,y+1)-distance(x,y-1))*.5;
        const len=Math.hypot(nx,ny)||1, i=(py*canvas.width+px)*4;
        data[i]=128+nx/len*bend*110; data[i+1]=128+ny/len*bend*110; data[i+2]=128; data[i+3]=255;
      }
      ctx.putImageData(pixels,0,0);
      const filter=document.createElementNS(ns,"filter");
      Object.entries({id,x:"0",y:"0",width:"100%",height:"100%","color-interpolation-filters":"sRGB"}).forEach(([k,v])=>filter.setAttribute(k,v));
      const map=document.createElementNS(ns,"feImage");
      Object.entries({href:canvas.toDataURL(),width:"100%",height:"100%",preserveAspectRatio:"none",result:"lens"}).forEach(([k,v])=>map.setAttribute(k,v));
      const displacement=document.createElementNS(ns,"feDisplacementMap");
      Object.entries({in:"SourceGraphic",in2:"lens",scale:String(strength),xChannelSelector:"R",yChannelSelector:"G"}).forEach(([k,v])=>displacement.setAttribute(k,v));
      filter.append(map,displacement); defs.append(filter);
      el.style.setProperty("--glass-refraction",`url(#${id})`); el.dataset.refraction = "rim";
    };
    const queue = (el: HTMLElement, delay=80) => {
      clearTimeout(timers.get(el)); timers.set(el,setTimeout(()=>build(el),delay));
    };
    const resize = new ResizeObserver(entries => entries.forEach(entry => {
      const el=entry.target as HTMLElement; queue(el);
    }));
    surfaces.forEach(el=>{build(el);resize.observe(el);});
    const changes = new MutationObserver(records => {
      const active=records.some(record=>record.attributeName==="data-active");
      surfaces.forEach(el=>queue(el,active?520:0));
    });
    changes.observe(root,{attributes:true,attributeFilter:["style","data-theme"]});
    root.querySelectorAll(".g-nav").forEach(nav=>changes.observe(nav,{attributes:true,attributeFilter:["data-active"]}));
    return () => {
      resize.disconnect(); changes.disconnect(); timers.forEach(clearTimeout);
      svg.remove();
      surfaces.forEach(el=>{el.style.removeProperty("--glass-refraction");delete el.dataset.refraction;});
    };
  }, [scope,key]);
}

type GlassSettings = {
  blur: number;
  opacity: number;
  saturation: number;
  tint: string;
  edge: number;
  distortion: number;
};

const defaultGlass: GlassSettings = {
  blur: 16,
  opacity: 0.7,
  saturation: 1.2,
  tint: "#ffffff",
  edge: 0.9,
  distortion: 18,
};

type GlassProps = {
  glass?: Partial< GlassSettings>;
  theme?: "light" | "dark";
  accent?: string;
  motion?: boolean;
  className?: string;
  style?: CSSProperties;
};

const finiteRange = (value: number | undefined, fallback: number, min: number, max: number) =>
  typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;

function glassStyle(glass: Partial< GlassSettings> = {}, accent?: string): CSSProperties {
  const tint = glass.tint === undefined ? defaultGlass.tint : /^#[0-9a-f]{6}$/i.test(glass.tint) ? glass.tint : defaultGlass.tint;
  const accentLight = accent && /^#[0-9a-f]{6}$/i.test(accent) && (parseInt(accent.slice(1, 3), 16) * 0.299 + parseInt(accent.slice(3, 5), 16) * 0.587 + parseInt(accent.slice(5, 7), 16) * 0.114) > 170;
  return {
    "--glass-blur": `${finiteRange(glass.blur, defaultGlass.blur, 0, 40)}px`,
    "--glass-opacity": finiteRange(glass.opacity, defaultGlass.opacity, 0.04, 0.95),
    "--glass-saturation": finiteRange(glass.saturation, defaultGlass.saturation, 0.5, 2),
    "--glass-tint": tint,
    "--glass-edge": finiteRange(glass.edge, defaultGlass.edge, 0, 1),
    "--glass-distortion": finiteRange(glass.distortion, defaultGlass.distortion, 0, 60),
    ...(accent ? { "--glass-accent": accent, "--g-accent-ink": accentLight ? "#183022" : "#f4fff5" } : {}),
  } as CSSProperties;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function GlassScope({ children, glass, theme, accent, className = "", style, motion = true }: GlassProps & { children: ReactNode }) {
  const root = useRef< HTMLDivElement>(null);
  useGlassOptics(root);
  return <div ref={root} className={`lgwf ${className}`} data-theme={theme} data-motion={motion ? "on" : "off"} style={{ ...glassStyle(glass, accent), ...style }}>{children}</div>;
}

const PADDING = 32;
type Edge = { value: number; velocity: number; target: number; center: number };
type Point = { x: number; y: number };
type Ripple = Point & { age: number; reach: number };
const RIPPLE_DURATION = 1.25;
const CONTROL_SELECTOR = "a,button,input,textarea,select,[contenteditable]";
const smoothstep = (x: number) => { const t = Math.max(0, Math.min(1, x)); return t*t*(3-2*t); };

/** One pointer lens, one shared material/border path, and four damped edge springs.
 * The material extends into an overscan area so outward pulls contain real glass.
 * No gesture capture, cursor replacement, autonomous waves, or trailing circles.
 */
function GlassFooterMotion({ footerRef, clipId, reduced, intensity, rippleStrength, cursorSize = 32, showCursor = true }: {
  footerRef: RefObject< HTMLElement | null>; clipId: string; reduced: boolean; intensity: number; rippleStrength: number;
  cursorSize?: number; showCursor?: boolean;
}) {
  const diameter = Number.isFinite(cursorSize) ? Math.max(18, Math.min(cursorSize, 56)) : 32;
  const svg = useRef< SVGSVGElement>(null), clip = useRef< SVGPathElement>(null);
  const rim = useRef< SVGPathElement>(null), cursor = useRef< HTMLDivElement>(null);
  const rippleLayer = useRef< SVGGElement>(null);
  useLayoutEffect(() => {
    const footer=footerRef.current, surface=svg.current, outline=rim.current, clipping=clip.current, lens=cursor.current;
    if (!footer || !surface || !outline || !clipping || !lens) return;
    const amount=Number.isFinite(intensity)?Math.max(0,Math.min(intensity,1.5)):0;
    const strength=Number.isFinite(rippleStrength)?Math.max(0,Math.min(rippleStrength,1.5)):0;
    const enabled=!reduced && amount>0;
    const rippleNodes=Array.from(rippleLayer.current?.querySelectorAll< SVGGElement>(".g-footer-ripple")??[]);
    const rippleCircles=rippleNodes.map(node=>Array.from(node.querySelectorAll("circle")));
    const waves:(Ripple|null)[]=rippleNodes.map(()=>null);
    let nextWave=0;
    const edges: Edge[]=Array.from({length:4},()=>({value:0,velocity:0,target:0,center:0}));
    const pointer={x:0,y:0,targetX:0,targetY:0,visible:0,targetVisible:0,initialized:false};
    let width=1,height=1,radius=28,raf=0,last=0,inView=true,contact:number|null=null;
    let hasPointer=false,disposed=false;
    const round=(n:number)=>Number(n.toFixed(3));
    const p=(point:Point)=>(round(point.x+PADDING)+" "+round(point.y+PADDING));
    function bend(at:number,length:number,edge:Edge){
      // Endpoint taper holds rounded corners still, including their tangents.
      const taper=smoothstep((at-radius)/26)*smoothstep((length-radius-at)/26);
      return edge.value*Math.exp(-((at-edge.center)**2)/(2*55*55))*taper;
    }
    function draw(){
      let d="M"+p({x:radius,y:0});
      function curve(point:(t:number)=>Point,length:number){
        const count=Math.max(12,Math.min(90,Math.ceil(length/12))), step=1/count;
        const tangent=(t:number)=>{
          const a=point(t-.001),b=point(t+.001);
          return{x:(b.x-a.x)/.002,y:(b.y-a.y)/.002};
        };
        for(let i=0;i<count;i++){
          const t=i*step,a=point(t),b=point(t+step),ta=tangent(t),tb=tangent(t+step);
          d+=" C"+p({x:a.x+ta.x*step/3,y:a.y+ta.y*step/3})+" "+p({x:b.x-tb.x*step/3,y:b.y-tb.y*step/3})+" "+p(b);
        }
      }
      curve(t=>{const x=radius+t*(width-2*radius);return{x,y:-bend(x,width,edges[0])};},width-2*radius);
      d+=" Q"+p({x:width,y:0})+" "+p({x:width,y:radius});
      curve(t=>{const y=radius+t*(height-2*radius);return{x:width+bend(y,height,edges[1]),y};},height-2*radius);
      d+=" Q"+p({x:width,y:height})+" "+p({x:width-radius,y:height});
      curve(t=>{const x=width-radius-t*(width-2*radius);return{x,y:height+bend(x,width,edges[2])};},width-2*radius);
      d+=" Q"+p({x:0,y:height})+" "+p({x:0,y:height-radius});
      curve(t=>{const y=height-radius-t*(height-2*radius);return{x:-bend(y,height,edges[3]),y};},height-2*radius);
      d+=" Q"+p({x:0,y:0})+" "+p({x:radius,y:0})+" Z";
      outline!.setAttribute("d",d); clipping!.setAttribute("d",d);
    }
    function targets(){
      const locations=[
        {at:pointer.x,out:-pointer.y,length:width},
        {at:pointer.y,out:pointer.x-width,length:height},
        {at:pointer.x,out:pointer.y-height,length:width},
        {at:pointer.y,out:-pointer.x,length:height}
      ];
      locations.forEach(({at,out,length},i)=>{
        const edge=edges[i];
        if(hasPointer && at>radius && at<length-radius && Math.abs(out)<75){
          edge.center=at;
          const proximity=smoothstep(1-Math.abs(out)/75);
          edge.target=Math.max(-12,Math.min(22,12+out*.8))*proximity*amount;
        }else edge.target=0;
      });
    }
    function clearRipples(){
      waves.fill(null);rippleNodes.forEach(node=>{node.style.opacity="0";});
    }
    function ripple(event:PointerEvent){
      if(!enabled||strength===0||!inView||document.hidden||event.button!==0||!event.isPrimary)return;
      if(event.target instanceof Element && event.target.closest(CONTROL_SELECTOR))return;
      const point=locate(event);
      if(point.x<0||point.x>width||point.y<0||point.y>height||!waves.length)return;
      const slot=nextWave++%waves.length;
      waves[slot]={...point,age:0,reach:Math.max(100,Math.min(270,width*.3))};
      rippleNodes[slot].setAttribute("transform",`translate(${point.x+PADDING} ${point.y+PADDING})`);
      rippleNodes[slot].style.opacity="0";
      wake();
    }
    function drawRipples(dt:number){
      waves.forEach((wave,i)=>{
        if(!wave)return;
        wave.age+=dt;
        const progress=Math.min(1,wave.age/RIPPLE_DURATION);
        const radius=18+wave.reach*(1-(1-progress)**2);
        const fadeIn=smoothstep(wave.age/.09);
        rippleNodes[i].style.opacity=String(Math.min(1,strength*.8*fadeIn*(1-progress)**1.4));
        rippleCircles[i].forEach(circle=>circle.setAttribute("r",String(round(radius))));
        if(progress===1){waves[i]=null;rippleNodes[i].style.opacity="0";}
      });
    }
    function tick(now:number){
      raf=0;
      if(disposed||!enabled||!inView||document.hidden){last=0;return;}
      const dt=Math.min(.05,Math.max(.001,(now-(last||now-16.67))/1000)); last=now;
      const follow=1-Math.exp(-18*dt),fade=1-Math.exp(-16*dt);
      pointer.x+=(pointer.targetX-pointer.x)*follow;
      pointer.y+=(pointer.targetY-pointer.y)*follow;
      pointer.visible+=(pointer.targetVisible-pointer.visible)*fade;
      targets();
      // Small integration steps keep the spring stable on slow or variable displays.
      const steps=Math.ceil(dt/(1/120)),h=dt/steps;
      for(let step=0;step<steps;step++) for(const edge of edges){
        edge.velocity+=(-260*(edge.value-edge.target)-18*edge.velocity)*h;
        edge.value+=edge.velocity*h;
        if(Math.abs(edge.value)>29){edge.value=Math.sign(edge.value)*29;edge.velocity=0;}
      }
      draw();
      drawRipples(dt);
      lens!.style.transform="translate3d("+round(pointer.x-diameter/2)+"px,"+round(pointer.y-diameter/2)+"px,0)";
      lens!.style.opacity=String(round(pointer.visible));
      const unsettled=edges.some(e=>Math.abs(e.value-e.target)>.015||Math.abs(e.velocity)>.05)
        ||Math.abs(pointer.x-pointer.targetX)+Math.abs(pointer.y-pointer.targetY)>.1
        ||Math.abs(pointer.visible-pointer.targetVisible)>.002||waves.some(Boolean);
      if(unsettled) wake();
      else{
        edges.forEach(e=>{e.value=e.target;e.velocity=0;});draw();
        pointer.visible=pointer.targetVisible;lens!.style.opacity=String(pointer.visible);
        footer!.dataset.meniscusState="idle";last=0;
      }
    }
    function wake(){
      if(enabled&&inView&&!document.hidden&&!disposed&&!raf){
        footer!.dataset.meniscusState="active";raf=requestAnimationFrame(tick);
      }
    }
    function reset(immediate=false){
      hasPointer=false;contact=null;pointer.targetVisible=0;
      edges.forEach(e=>{e.target=0;});
      if(immediate){
        cancelAnimationFrame(raf);raf=0;last=0;pointer.visible=0;pointer.initialized=false;
        clearRipples();
        edges.forEach(e=>{e.value=0;e.velocity=0;});lens!.style.opacity="0";draw();
        footer!.dataset.meniscusState=enabled?"idle":"reduced";
      }else wake();
    }
    function locate(event:PointerEvent){
      const bounds=footer!.getBoundingClientRect();
      return{x:(event.clientX-bounds.left)*width/bounds.width,y:(event.clientY-bounds.top)*height/bounds.height};
    }
    function update(event:PointerEvent){
      if(!enabled||!inView||document.hidden)return;
      const point=locate(event);
      const near=point.x>-75&&point.x<width+75&&point.y>-75&&point.y<height+75;
      if(!near){if(hasPointer)reset();return;}
      const control=event.target instanceof Element && !!event.target.closest(CONTROL_SELECTOR);
      if(!pointer.initialized){
        pointer.x=point.x;pointer.y=point.y;pointer.initialized=true;
      }
      pointer.targetX=point.x;pointer.targetY=point.y;
      pointer.targetVisible=showCursor ? (control ? .18 : 1) : 0;hasPointer=true;wake();
    }
    function move(event:PointerEvent){
      if(event.pointerType==="touch"&&event.pointerId!==contact)return;
      update(event);
    }
    function down(event:PointerEvent){
      ripple(event);
      if(event.pointerType!=="touch"){update(event);return;}
      if(event.target instanceof Element && event.target.closest(CONTROL_SELECTOR))return;
      const point=locate(event);
      if(point.x<-24||point.x>width+24||point.y<-24||point.y>height+24)return;
      contact=event.pointerId;update(event);
    }
    function release(event:PointerEvent){
      if(event.type==="pointercancel"){reset(true);return;}
      if(event.pointerId===contact)reset();
    }
    function leave(event:PointerEvent){if(!event.relatedTarget)reset();}
    function scroll(){if(hasPointer||waves.some(Boolean))reset(true);}
    function visibility(){if(document.hidden)reset(true);}
    function blur(){reset(true);}
    function resize(){
      width=Math.max(1,footer!.offsetWidth);height=Math.max(1,footer!.offsetHeight);
      radius=Math.min(parseFloat(getComputedStyle(footer!).borderTopLeftRadius)||28,width/2,height/2);
      surface!.setAttribute("viewBox","0 0 "+(width+PADDING*2)+" "+(height+PADDING*2));
      reset(true);
    }
    const size=new ResizeObserver(resize);size.observe(footer);resize();
    const intersection=new IntersectionObserver(([entry])=>{
      inView=entry.isIntersecting;if(!inView)reset(true);
    });intersection.observe(footer);
    if(enabled){
      window.addEventListener("pointermove",move,{passive:true});
      window.addEventListener("pointerdown",down,{passive:true});
      window.addEventListener("pointerup",release,{passive:true});
      window.addEventListener("pointercancel",release,{passive:true});
      document.addEventListener("pointerout",leave,{passive:true});
      window.addEventListener("scroll",scroll,{passive:true,capture:true});
      window.addEventListener("blur",blur);
      document.addEventListener("visibilitychange",visibility);
    }
    return()=>{
      disposed=true;cancelAnimationFrame(raf);size.disconnect();intersection.disconnect();
      window.removeEventListener("pointermove",move);window.removeEventListener("pointerdown",down);
      window.removeEventListener("pointerup",release);window.removeEventListener("pointercancel",release);
      document.removeEventListener("pointerout",leave);window.removeEventListener("scroll",scroll,true);
      window.removeEventListener("blur",blur);document.removeEventListener("visibilitychange",visibility);
      lens.style.opacity="0";delete footer.dataset.meniscusState;
      clearRipples();
    };
  },[footerRef,reduced,intensity,rippleStrength,diameter,showCursor]);
  return <>
    <svg ref={svg} className="g-footer-rim g-footer-liquid" viewBox="0 0 1064 664" preserveAspectRatio="none" aria-hidden="true">
      <defs><clipPath id={clipId} clipPathUnits="userSpaceOnUse"><path ref={clip}/></clipPath></defs>
      <g ref={rippleLayer} clipPath={`url(#${clipId})`}>
        {[0,1,2].map(index=><g key={index} className="g-footer-ripple" opacity="0">
          <circle className="g-footer-ripple-shadow" cy="1.5" r="0" vectorEffect="non-scaling-stroke"/>
          <circle className="g-footer-ripple-highlight" r="0" vectorEffect="non-scaling-stroke"/>
        </g>)}
      </g>
      <path ref={rim} className="g-footer-wave" vectorEffect="non-scaling-stroke"/>
    </svg>
    <div ref={cursor} className="g-footer-pointer-lens g-material" style={{ width: diameter, height: diameter }} aria-hidden="true"/>
  </>;
}

gsap.registerPlugin(ScrollTrigger, useGSAP);
export type GlassFooterLinkGroup = { title: string; links: { label: string; href: string }[] };
export type LiquidGlassWordmarkFooterProps = GlassProps & {
  brand?: string;
  brandIcon?: ReactNode;
  brandHref?: string;
  title?: string;
  description?: string;
  groups: GlassFooterLinkGroup[];
  copyright?: string;
  onSubscribe?: (email: string) => Promise< void>;
  subscriptionNote?: string;
  motionIntensity?: number;
  /** Click/tap ripple strength, 0 to 1.5. Zero leaves the droplet and edges active. */
  rippleStrength?: number;
  /** Pointer lens diameter in pixels, clamped to 18..56. */
  cursorSize?: number;
  /** Hides the decorative lens while keeping elastic edges and ripples active. */
  showCursor?: boolean;
};

export function LiquidGlassWordmarkFooter({
  brand = "Your studio", brandIcon, brandHref = "/", title = "Make room for what matters.",
  description = "Thoughtful ideas for a more connected business.",
  groups, copyright, onSubscribe, subscriptionNote, motionIntensity = 1, rippleStrength = 1, cursorSize = 32, showCursor = true, motion = true, ...props
}: LiquidGlassWordmarkFooterProps) {
  const root = useRef< HTMLElement>(null);
  const formId = useId();
  const clipId = "footer-glass-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [status, setStatus] = useState< "idle" | "pending" | "success" | "error">("idle");
  const reduced = useReducedMotion() || !motion;
  useGSAP(() => {
    if (reduced) return;
    gsap.from(".g-footer-content", {
      y: 14, duration: 0.8, ease: "expo.out",
      scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
    });
  }, { scope: root, dependencies: [reduced], revertOnUpdate: true });
  async function submit(event: FormEvent< HTMLFormElement>) {
    event.preventDefault();
    if (!onSubscribe || status === "pending") return;
    const form = event.currentTarget;
    setStatus("pending");
    try {
      await onSubscribe(String(new FormData(form).get("email") ?? ""));
      setStatus("success");
      form.reset();
    } catch { setStatus("error"); }
  }
  return <GlassScope {...props} motion={motion}><div className="g-footer-frame">
    <footer ref={root} className="g-footer" aria-label={brand}>
      <div className="g-footer-surface g-material" data-glass-optics="elastic" aria-hidden="true" style={{ clipPath: `url(#${clipId})` }} />
      <div className="g-footer-content">
        <div className="g-footer-intro">
          <a className="g-footer-brand" href={brandHref} aria-label={brand + " home"}>{brandIcon && <span aria-hidden="true" className="g-footer-brand-icon">{brandIcon}</span>}{brand}</a>
          <h2>{title}</h2><p>{description}</p>
          {onSubscribe && <form className="g-footer-form" onSubmit={submit}>
            <label className="g-visually-hidden" htmlFor={formId}>Email address</label>
            <div className="g-footer-input"><input id={formId} name="email" type="email" placeholder="Your email address" autoComplete="email" required disabled={status === "pending"} /><button type="submit" aria-label="Join the mailing list" disabled={status === "pending"}>{status === "success" ? <Check /> : <ArrowRight />}</button></div>
            {subscriptionNote && <small>{subscriptionNote}</small>}
            <p className="g-footer-status" role="status">{status === "pending" ? "One moment..." : status === "success" ? "Thanks. Your request was received." : status === "error" ? "That did not go through. Please try again." : ""}</p>
          </form>}
        </div>
        <div className="g-footer-links g-material" data-glass-light="static">{groups.map(group => <nav key={group.title} aria-label={group.title}><h3>{group.title}</h3>{group.links.map(link => <a key={link.href} href={link.href}>{link.label}<ArrowUpRight aria-hidden="true" /></a>)}</nav>)}</div>
      </div>
      <div className="g-footer-bottom"><span>{copyright ?? brand}</span><span><span className="g-footer-dot" aria-hidden="true" />Built with care.</span></div>
    </footer>
    <GlassFooterMotion footerRef={root} clipId={clipId} reduced={reduced} intensity={motionIntensity} rippleStrength={rippleStrength} cursorSize={cursorSize} showCursor={showCursor} />
  </div></GlassScope>;
}
