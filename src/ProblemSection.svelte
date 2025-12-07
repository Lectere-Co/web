<section class="problem">
	<div class="container">
		<h2 class="section-title">Software shouldn't be this hard.</h2>
		
		<div class="stats-grid">
			<div class="stat-card">
				<div class="stat-number">76%</div>
				<div class="stat-label">of users give up when stuck</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">Days or Weeks</div>
				<div class="stat-label">Onboarding takes</div>
			</div>
			<div class="stat-card">
				<div class="stat-number">$8.5T</div>
				<div class="stat-label">lost globally by 2030</div>
			</div>
		</div>
		
		<div class="frustration-flow">
			<div class="flow-step error">Wrong click</div>
			<div class="flow-arrow">→</div>
			<div class="flow-step error">Search help</div>
			<div class="flow-arrow">→</div>
			<div class="flow-step error">Watch outdated video</div>
			<div class="flow-arrow">→</div>
			<div class="flow-step error">Still stuck</div>
			<div class="flow-arrow">→</div>
			<div class="flow-step highlight">Give up</div>
		</div>
	</div>
</section>

<style>
	.problem {
		padding: 8rem 2rem;
		background: linear-gradient(180deg, #15111a 0%, #1a1520 100%);
		position: relative;
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
	
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 5rem;
	}
	
	.stat-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(155, 39, 76, 0.2);
		border-radius: 24px;
		padding: 3rem 2rem;
		text-align: center;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}
	
	.stat-card:hover {
		transform: translateY(-5px);
		border-color: rgba(155, 39, 76, 0.5);
		box-shadow: 0 8px 40px rgba(155, 39, 76, 0.2);
	}
	
	.stat-number {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 800;
		background: linear-gradient(135deg, var(--razzmatazz), var(--amaranth-purple));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
	}
	
	.stat-label {
		font-size: 1.1rem;
		color: #b0b0b0;
	}
	
	.frustration-flow {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 2rem;
	}
	
	.flow-step {
		padding: 1rem 1.5rem;
		border-radius: 12px;
		font-weight: 600;
		font-size: 1rem;
	}
	
	.flow-step.error {
		background: rgba(155, 39, 76, 0.15);
		border: 1px solid var(--amaranth-purple);
		color: #ff8fa3;
	}
	
	.flow-step.highlight {
		background: rgba(235, 51, 110, 0.2);
		border: 2px solid var(--razzmatazz);
		color: var(--razzmatazz);
	}
	
	.flow-arrow {
		color: var(--razzmatazz);
		font-size: 1.5rem;
	}
</style>
