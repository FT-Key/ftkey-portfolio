import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

// ⬇️ Carga dinámica (NO entra en el bundle inicial)
const Projects = lazy(() => import("../components/Projects"));

const Home = () => {
  const triggerRef = useRef(null);
  const [loadProjects, setLoadProjects] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadProjects(true);
          observer.disconnect(); // solo cargar una vez
        }
      },
      {
        rootMargin: "300px", // empieza a cargar ANTES de que llegue
      }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />

      {/* Punto que dispara la carga */}
      <div ref={triggerRef} />

      {loadProjects && (
        <Suspense fallback={<div className="h-[400px]" />}>
          <Projects />
        </Suspense>
      )}

      <Contact />
    </>
  );
};

export default Home;
