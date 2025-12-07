<section class="business-cases">
	<div class="container">
		<h2 class="section-title">Built for teams drowning in support tickets.</h2>
		
		<div class="cases-grid">
			<div class="case-card">
				<h3>SaaS companies</h3>
				<p>Reduce support load by 70% with proactive in-app guidance</p>
			</div>
			<div class="case-card">
				<h3>Enterprises</h3>
				<p>Accelerate employee onboarding and reduce training costs</p>
			</div>
			<div class="case-card">
				<h3>High-growth product teams</h3>
				<p>Scale adoption without scaling support headcount</p>
			</div>
		</div>
	</div>
</section>

<style>
	.business-cases {
		padding: 8rem 2rem;
		background: linear-gradient(180deg, #1a1520 0%, #15111a 100%);
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
	
	.cases-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.case-card {
		background: rgba(255, 255, 255, 0.03);
		border-top: 3px solid var(--razzmatazz);
		border-radius: 16px;
		padding: 2.5rem;
		transition: all 0.3s ease;
	}
	
	.case-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 40px rgba(235, 51, 110, 0.3);
	}
	
	.case-card h3 {
		font-size: 1.6rem;
		margin-bottom: 1rem;
		color: var(--razzmatazz);
	}
	
	.case-card p {
		color: #d0d0d0;
		line-height: 1.7;
		font-size: 1.1rem;
	}
</style>
