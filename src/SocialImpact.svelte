<section class="social-impact">
	<div class="container">
		<h2 class="section-title">The digital accessibility crisis.</h2>
		
		<div class="impact-content">
			<p class="impact-text">
				Every day, millions of people are left behind by software that assumes everyone learns the same way. Broken onboarding experiences waste countless hours and exclude those who need technology most.
			</p>
			<p class="impact-text">
				Lectere exists to make software accessible to everyone — regardless of age, technical skill, or learning style.
			</p>
		</div>
	</div>
</section>

<style>
	.social-impact {
		padding: 8rem 2rem;
		background: linear-gradient(135deg, rgba(155, 39, 76, 0.1) 0%, rgba(235, 51, 110, 0.1) 100%);
		position: relative;
		overflow: hidden;
	}
	
	.social-impact::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(45deg, transparent 30%, rgba(155, 39, 76, 0.05) 50%, transparent 70%);
		animation: shimmer 8s ease-in-out infinite;
	}
	
	@keyframes shimmer {
		0%, 100% { transform: translateX(-100%); }
		50% { transform: translateX(100%); }
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.section-title {
		font-size: clamp(2rem, 6vw, 3.5rem);
		font-weight: 800;
		text-align: center;
		margin-bottom: 4rem;
		letter-spacing: -0.02em;
	}
	
	.impact-content {
		max-width: 800px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}
	
	.impact-text {
		font-size: 1.4rem;
		line-height: 1.8;
		margin-bottom: 2rem;
		color: #e0e0e0;
		text-align: center;
	}
</style>
