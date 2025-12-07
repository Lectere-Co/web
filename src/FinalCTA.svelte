<section class="final-cta">
	<div class="container">
		<h2 class="cta-headline">Stop teaching people how to use software. Let software teach them.</h2>
		<div class="cta-buttons">
			<button class="btn-primary large">Request a Demo</button>
			<button class="btn-secondary large">Start Free Trial</button>
		</div>
	</div>
</section>

<style>
	.final-cta {
		padding: 10rem 2rem;
		background: linear-gradient(135deg, rgba(155, 39, 76, 0.15) 0%, rgba(235, 51, 110, 0.15) 100%);
		position: relative;
		overflow: hidden;
	}
	
	.final-cta::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 30% 50%, rgba(155, 39, 76, 0.2) 0%, transparent 50%),
		            radial-gradient(circle at 70% 50%, rgba(235, 51, 110, 0.2) 0%, transparent 50%);
		animation: gradientPulse 6s ease-in-out infinite;
	}
	
	@keyframes gradientPulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.6; }
	}
	
	.final-cta .container {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.cta-headline {
		font-size: clamp(2rem, 6vw, 3.5rem);
		font-weight: 800;
		max-width: 900px;
		margin: 0 auto 3rem;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}
	
	.cta-buttons {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.btn-primary.large,
	.btn-secondary.large {
		padding: 1.25rem 3rem;
		font-size: 1.2rem;
	}
	
	.btn-primary {
		background: var(--razzmatazz);
		color: white;
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
