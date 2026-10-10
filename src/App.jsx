import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation, Keyboard, Parallax } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "./App.css";

/* bottle  : public/bottles/<file>.png
   fruitImg: public/fruits/<file>.png  (emoji illatha fruits-ku) */
const ITEMS = [
  { id: 1, name: "Kiwi", eyebrow: "Green Zest Collection",
    bg: "#B8E27A", fruit: "🥝", img: `${import.meta.env.BASE_URL}bottle/kiwi.png`,
    desc: "Tangy green kiwi with a crisp, refreshing finish.",
    stats: { volume: "370 ml", sugar: "Cane", serve: "4°C" },
    pairings: ["Greek Yogurt", "Mint Leaves", "Lime Wedge"] },

  { id: 2, name: "Dragon", eyebrow: "Dragon Fruit Exotic Blend",
    bg: "#FF9EC7", fruit: "🍚",  img: `${import.meta.env.BASE_URL}bottle/dragon.png`,
    desc: "Delicate, lightly sweet dragon fruit with a vibrant magenta glow.",
    stats: { volume: "370 ml", sugar: "Natural", serve: "5°C" },
    pairings: ["Coconut Chips", "Lychee", "Chia Pudding"] },

  { id: 3, name: "Avocado", eyebrow: "Creamy Smooth Series",
    bg: "#C9D98A", fruit: "🥑", img: `${import.meta.env.BASE_URL}bottle/avocado.png`,
    desc: "Rich, silky avocado blend with a naturally creamy body.",
    stats: { volume: "370 ml", sugar: "Low", serve: "6°C" },
    pairings: ["Multigrain Toast", "Honey", "Roasted Nuts"] },

  { id: 4, name: "Strawberry", eyebrow: "Garden Berry Reserve",
    bg: "#FFC2B0", fruit: "🍓", img: `${import.meta.env.BASE_URL}bottle/strawberry.png`,
    desc: "Bright, floral berry notes with a soft sparkle.",
    stats: { volume: "370 ml", sugar: "Cane", serve: "5°C" },
    pairings: ["Vanilla Cake", "Soft Cheese", "Fresh Mint"] },

  { id: 5, name: "Blueberry", eyebrow: "Wild Berry Edition",
    bg: "#A9B8FF", fruit: "🫐", img: `${import.meta.env.BASE_URL}bottle/blueberry.png`,
    desc: "Deep, antioxidant-rich blueberry with a smooth, mellow finish.",
    stats: { volume: "370 ml", sugar: "Low", serve: "4°C" },
    pairings: ["Oat Cookies", "Cream Cheese", "Almonds"] },

  { id: 6, name: "Orange", eyebrow: "Sunrise Citrus Press",
    bg: "#FFB45E", fruit: "🍊", img: `${import.meta.env.BASE_URL}bottle/orange.png`,
    desc: "Cold-pressed orange with bright, naturally sweet acidity.",
    stats: { volume: "370 ml", sugar: "Natural", serve: "3°C" },
    pairings: ["Butter Croissant", "Dark Chocolate", "Cinnamon"] },

  { id: 7, name: "Pomegranate", eyebrow: "Ruby Harvest Reserve",
    bg: "#F58A9A", fruit: "👛", img: `${import.meta.env.BASE_URL}bottle/pomegranate.png`,
    desc: "Ruby-red pomegranate with a tart, elegant depth.",
    stats: { volume: "370 ml", sugar: "Cane", serve: "5°C" },
    pairings: ["Feta Salad", "Pistachios", "Rose Water"] },
];

/* background-la scatter aagura kutty fruits */
const BG_SPOTS = [
  { x: "4%",  y: "18%", size: 26, blur: 1, rot: -15 },
  { x: "9%",  y: "42%", size: 18, blur: 2, rot: 20 },
  { x: "5%",  y: "68%", size: 30, blur: 0, rot: 10 },
  { x: "13%", y: "84%", size: 20, blur: 1, rot: -25 },
  { x: "22%", y: "10%", size: 18, blur: 2, rot: 15 },
  { x: "30%", y: "90%", size: 24, blur: 1, rot: -10 },
  { x: "46%", y: "6%",  size: 20, blur: 1, rot: 25 },
  { x: "58%", y: "92%", size: 20, blur: 2, rot: -20 },
  { x: "72%", y: "9%",  size: 24, blur: 1, rot: 12 },
  { x: "80%", y: "86%", size: 28, blur: 0, rot: -15 },
  { x: "90%", y: "16%", size: 22, blur: 1, rot: 18 },
  { x: "94%", y: "40%", size: 18, blur: 2, rot: -22 },
  { x: "91%", y: "66%", size: 26, blur: 1, rot: 8 },
  { x: "86%", y: "90%", size: 18, blur: 1, rot: -12 },
];

export default function App() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [toast, setToast] = useState(null);
  const [orders, setOrders] = useState(0);
  const rootRef = useRef(null);

  /* GSAP: floating fruits + drifting orbs */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fruit").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 18 : -18,
          rotate: i % 2 ? 12 : -12,
          duration: 2.4 + (i % 4) * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
      gsap.utils.toArray(".bg-fruit").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 22 : -22,
          x: i % 3 ? 10 : -10,
          rotate: `+=${i % 2 ? 14 : -14}`,
          duration: 4 + (i % 5) * 0.7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
      gsap.to(".orb-1", { x: 80, y: 60, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-2", { x: -90, y: -50, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* GSAP: bottle tilt */
  const handleMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(".swiper-slide-active .bottle-img", {
      rotateY: x * 12, rotateX: -y * 6, duration: 0.8, ease: "power3.out",
    });
  };

  const closeModal = () => setSelected(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = (item) => { setConfirmed(false); setSelected(item); };

  const confirmOrder = () => {
    if (confirmed) return;
    setConfirmed(true);
    setOrders((n) => n + 1);
    setToast(`${selected.name} added to your order`);
    setTimeout(() => setToast(null), 2600);
    setTimeout(closeModal, 1400);
  };

  const current = ITEMS[active];

  return (
    <div ref={rootRef} className="app" style={{ backgroundColor: current.bg }} onMouseMove={handleMove}>
      <div className="bg-layer">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        {BG_SPOTS.map((s, i) => (
          <span
            key={i}
            className="bg-fruit"
            style={{ left: s.x, top: s.y, fontSize: s.size, "--b": `${s.blur}px`, "--r": `${s.rot}deg` }}
          >
            {current.fruitImg
              ? <img src={current.fruitImg} alt="" style={{ width: s.size }} />
              : current.fruit}
          </span>
        ))}
      </div>

      <header className="header">
        <span className="brand">FIZZ&nbsp;&amp;&nbsp;CO.</span>
        <span className="cart">Orders: {orders}</span>
      </header>

      <Swiper
        modules={[EffectCreative, Navigation, Keyboard, Parallax]}
        effect="creative"
        creativeEffect={{
          prev: { translate: ["-100%", 0, 0], opacity: 0 },
          next: { translate: ["100%", 0, 0], opacity: 0 },
        }}
        parallax
        speed={900}
        keyboard={{ enabled: true }}
        navigation={{ prevEl: ".nav-prev", nextEl: ".nav-next" }}
        grabCursor
        onSlideChange={(s) => setActive(s.activeIndex)}
        className="carousel"
      >
        {ITEMS.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => (
              <div className="slide">
                <motion.p
                  className="eyebrow"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -16 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  {item.eyebrow}
                </motion.p>

                <h1 className="title" data-swiper-parallax="-35%">{item.name}</h1>

                <div className="fruits" data-swiper-parallax="-140%">
                  {["f1", "f2", "f3", "f4"].map((c) => (
                    <span key={c} className={`fruit ${c}`}>
                      {item.fruitImg ? <img src={item.fruitImg} alt="" /> : item.fruit}
                    </span>
                  ))}
                </div>

                <div className="bottle" data-swiper-parallax="-70%">
                  <motion.img
                    className="bottle-img"
                    src={item.img}
                    alt={item.name}
                    initial={false}
                    animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.4 }}
                    transition={{ type: "spring", stiffness: 90, damping: 14 }}
                  />
                  <div className="shadow" />
                </div>

                <motion.button
                  className="cta"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(item)}
                >
                  Reserve Your Bottle
                </motion.button>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="nav nav-prev" aria-label="Previous">‹</button>
      <button className="nav nav-next" aria-label="Next">›</button>

      <div className="pager">
        {ITEMS.map((_, i) => (<span key={i} className={i === active ? "pg on" : "pg"} />))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} onClick={closeModal}>
            <motion.div
              className="modal"
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close" onClick={closeModal} aria-label="Close">✕</button>

              <div className="m-left">
                <motion.img className="m-bottle" src={selected.img} alt={selected.name}
                  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} />
              </div>

              <div className="m-right">
                <h2>{selected.name}</h2>
                <p className="m-sub">{selected.eyebrow}</p>
                <p className="m-desc">{selected.desc}</p>

                <div className="stats">
                  <div><small>Volume</small><b>{selected.stats.volume}</b></div>
                  <div><small>Sweetener</small><b>{selected.stats.sugar}</b></div>
                  <div><small>Serve At</small><b>{selected.stats.serve}</b></div>
                </div>

                <small className="pair-title">Best Paired With</small>
                <div className="chips">
                  {selected.pairings.map((p) => (<span key={p}>{p}</span>))}
                </div>

                <motion.button
                  className={confirmed ? "confirm done" : "confirm"}
                  whileHover={{ scale: confirmed ? 1 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={confirmOrder}
                >
                  {confirmed ? "✓ Reservation Confirmed" : "Confirm Reservation"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div className="toast" initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }} exit={{ x: 80, opacity: 0 }}>
            <i /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}