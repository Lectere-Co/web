<section class="how-it-works">
	<div class="container">
		<h2 class="section-title">How Lectere works.</h2>
		
		<div class="process-flow">
			<div class="process-step">
				<div class="step-number">1</div>
				<h3>Detects live user context</h3>
				<p>AI understands what you're trying to do</p>
			</div>
			<div class="process-arrow">→</div>
			<div class="process-step">
				<div class="step-number">2</div>
				<h3>Visually guides every click</h3>
				<p>Highlights exactly where to interact</p>
			</div>
			<div class="process-arrow">→</div>
			<div class="process-step">
				<div class="step-number">3</div>
				<h3>Auto-updates workflows</h3>
				<p>Adapts to UI changes automatically</p>
			</div>
		</div>
	</div>
</section>

<style>
	.how-it-works {
		padding: 8rem 2rem;
		background: linear-gradient(180deg, #15111a 0%, #1a1520 100%);
	}
	
	.container {
		max-width: 1400px;
		margin: 0 auto;
	}
	
	.section-title {
		font-size: clamp(2rem, 6vw, 3.5rem);
		font-weight: 800;
		text-align: center;
		margin-bottom: 4rem;
		letter-spacing: -0.02em;
	}
	
	.process-flow {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 2rem;
		max-width: 1400px;
		margin: 0 auto;
	}
	
	.process-step {
		flex: 1;
		min-width: 280px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(155, 39, 76, 0.3);
		border-radius: 24px;
		padding: 3rem 2rem;
		text-align: center;
		transition: all 0.3s ease;
	}
	
	.process-step:hover {
		transform: translateY(-5px);
		border-color: rgba(235, 51, 110, 0.6);
		box-shadow: 0 8px 40px rgba(235, 51, 110, 0.3);
	}
	
	.step-number {
		width: 60px;
		height: 60px;
		margin: 0 auto 1.5rem;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--razzmatazz), var(--amaranth-purple));
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.8rem;
		font-weight: 800;
	}
	
	.process-step h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	
	.process-step p {
		color: #b0b0b0;
		line-height: 1.6;
	}
	
	.process-arrow {
		font-size: 2.5rem;
		color: var(--razzmatazz);
		font-weight: bold;
	}
	
	@media (max-width: 768px) {
		.process-arrow {
			transform: rotate(90deg);
		}
	}
</style>
