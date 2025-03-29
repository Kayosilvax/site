document.addEventListener("DOMContentLoaded", function () {
    const photoCards = document.querySelectorAll(".photo-card");
    let currentPlayingIframe = null;

    photoCards.forEach((card) => {
        card.addEventListener("click", function () {
            stopAllSpotifyMusic();

            const iframe = card.querySelector(".spotify-player");
            if (iframe) {
                playSpotifyMusic(iframe);
                currentPlayingIframe = iframe;
            }
        });
    });

    function stopAllSpotifyMusic() {
        if (currentPlayingIframe) {
            const src = currentPlayingIframe.src;
            currentPlayingIframe.src = "";
            currentPlayingIframe.src = src; // Reinicia o iframe para parar a música
        }
    }

    function playSpotifyMusic(iframe) {
        const src = iframe.src;
        iframe.src = ""; 
        setTimeout(() => {
            iframe.src = src; // Recarrega o iframe para garantir que a música toque corretamente
        }, 100);
    }

    // ---- Efeito de Fogos de Artifício ----
    const fireworks = document.createElement("canvas");
    fireworks.style.position = "fixed";
    fireworks.style.top = "0";
    fireworks.style.left = "0";
    fireworks.style.width = "100vw";
    fireworks.style.height = "100vh";
    fireworks.style.pointerEvents = "none";
    document.body.appendChild(fireworks);

    const ctx = fireworks.getContext("2d");
    fireworks.width = window.innerWidth;
    fireworks.height = window.innerHeight;
    let particles = [];

    function Firework(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5,
        };
        this.alpha = 1;
        this.gravity = 0.05;
    }

    Firework.prototype.update = function () {
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
    };

    Firework.prototype.draw = function () {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    function createFireworks(x, y) {
        for (let i = 0; i < 50; i++) {
            particles.push(new Firework(x, y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, fireworks.width, fireworks.height);
        particles.forEach((p, i) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) particles.splice(i, 1);
        });
        requestAnimationFrame(animate);
    }

    function launchFireworks() {
        const x = Math.random() * fireworks.width;
        const y = Math.random() * fireworks.height * 0.5;
        createFireworks(x, y);
    }

    setInterval(launchFireworks, 500);
    animate();
});
