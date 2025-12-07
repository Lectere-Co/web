<script>
	let { mouseX, mouseY } = $props();
</script>

<section class="hero">
	<div class="hero-bg" style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px;">
		<div class="cursor-glow"></div>
	</div>
	<div class="hero-content">
		<h1 class="hero-headline">Software that teaches you while you use it.</h1>
		<p class="hero-subtext">
			Lectere is an AI assistant that lives inside software and shows you exactly what to click, step by step, in real time.
		</p>
		<div class="hero-ctas">
			<button class="btn-primary">Watch Live Demo</button>
			<button class="btn-secondary">Get Started</button>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	
	.hero-bg {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 20% 30%, rgba(155, 39, 76, 0.15) 0%, transparent 50%),
		            radial-gradient(circle at 80% 70%, rgba(235, 51, 110, 0.15) 0%, transparent 50%),
		            linear-gradient(180deg, #0a0a0f 0%, #15111a 100%);
		animation: gradientShift 10s ease infinite;
	}
	
	.cursor-glow {
		position: absolute;
		width: 300px;
		height: 300px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(235, 51, 110, 0.2) 0%, transparent 70%);
		pointer-events: none;
		transform: translate(-50%, -50%);
		left: var(--mouse-x);
		top: var(--mouse-y);
		transition: opacity 0.3s ease;
	}
	
	@keyframes gradientShift {
		0%, 100% { filter: hue-rotate(0deg); }
		50% { filter: hue-rotate(10deg); }
	}
	
	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 900px;
		padding: 2rem;
		text-align: center;
	}
	
	.hero-headline {
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.1;
		margin-bottom: 1.5rem;
		background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: fadeInUp 1s ease-out;
	}
	
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.hero-subtext {
		font-size: clamp(1.1rem, 2.5vw, 1.4rem);
		line-height: 1.6;
		color: #b0b0b0;
		margin-bottom: 3rem;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
		animation: fadeInUp 1s ease-out 0.2s backwards;
	}
	
	.hero-ctas {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		animation: fadeInUp 1s ease-out 0.4s backwards;
	}
	
	.btn-primary {
		background: var(--razzmatazz);
		color: white;
		padding: 1rem 2.5rem;
		font-size: 1.1rem;
		font-weight: 600;
		border: none;
		border-radius: 16px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 20px rgba(235, 51, 110, 0.3);
	}
	
	.btn-primary:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow: 0 6px 30px rgba(235, 51, 110, 0.5);
	}
	
	.btn-secondary {
		background: transparent;
		color: white;
		padding: 1rem 2.5rem;
		font-size: 1.1rem;
		font-weight: 600;
		border: 2px solid var(--amaranth-purple);
		border-radius: 16px;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	
	.btn-secondary:hover {
		transform: translateY(-2px);
		background: rgba(155, 39, 76, 0.1);
		box-shadow: 0 0 20px rgba(155, 39, 76, 0.3);
	}
</style>
