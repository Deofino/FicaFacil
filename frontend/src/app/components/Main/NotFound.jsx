import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  React.useEffect(() => {
    document.querySelector("body").id = "notfound";
    const cordCanvas = document.getElementById("cordao");
    const ctx = cordCanvas.getContext("2d");

    let y1 = 160;
    let y2 = 100;
    let y3 = 100;

    let y1Forward = true;
    let y2Forward = false;
    let y3Forward = true;

    function drawVisor() {
      const canvas = document.getElementById("visor");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(5, 45);
      ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);

      ctx.lineTo(55, 20);
      ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);

      ctx.lineTo(15, 10);

      ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
      ctx.lineTo(5, 45);

      ctx.fillStyle = "#2f3640";
      ctx.strokeStyle = "#f5f6fa";
      ctx.fill();
      ctx.stroke();
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.beginPath();
      ctx.moveTo(130, 170);
      ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

      ctx.strokeStyle = "white";
      ctx.lineWidth = 8;
      ctx.stroke();

      if (y1 === 100) {
        y1Forward = true;
      }
      if (y1 === 300) {
        y1Forward = false;
      }
      if (y2 === 100) {
        y2Forward = true;
      }
      if (y2 === 310) {
        y2Forward = false;
      }
      if (y3 === 100) {
        y3Forward = true;
      }
      if (y3 === 317) {
        y3Forward = false;
      }
      y1Forward ? (y1 += 1) : (y1 -= 1);
      y2Forward ? (y2 += 1) : (y2 -= 1);
      y3Forward ? (y3 += 1) : (y3 -= 1);
    }

    drawVisor();
    animate();

    return () => (document.querySelector("body").id = "");
  }, []);
  return (
    <React.Fragment>
      <div className="lua"></div>
      <div className="crater crater1"></div>
      <div className="crater crater2"></div>
      <div className="crater crater3"></div>

      <div className="estrela estrela1"></div>
      <div className="estrela estrela2"></div>
      <div className="estrela estrela3"></div>
      <div className="estrela estrela4"></div>
      <div className="estrela estrela5"></div>

      <div className="error">
        <div className="title">404</div>
        <div className="subtitle">Hmmm...</div>
        <div className="descricao">Página não encontrada</div>
        <button className="btn">
          <Link to="/">HOME</Link>
        </button>
      </div>

      <div className="astronauta">
        <div className="mochila"></div>
        <div className="body"></div>
        <div className="peito"></div>
        <div className="braco-left1"></div>
        <div className="braco-left2"></div>
        <div className="braco-right1"></div>
        <div className="braco-right2"></div>
        <div className="braco-thumb-left"></div>
        <div className="braco-thumb-right"></div>
        <div className="perna-left"></div>
        <div className="perna-right"></div>
        <div className="pe-left"></div>
        <div className="pe-right"></div>
        <div className="pulso-left"></div>
        <div className="pulso-right"></div>
        <div className="cord">
          <canvas id="cordao" height="500px" width="500px"></canvas>
        </div>
        <div className="head">
          <canvas id="visor" width="60px" height="60px"></canvas>
          <div className="head-visor-clarao1"></div>
          <div className="head-visor-clarao2"></div>
        </div>
      </div>
    </React.Fragment>
  );
}
