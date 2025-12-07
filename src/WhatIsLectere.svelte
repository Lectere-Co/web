<section class="what-is">
	<div class="container">
		<h2 class="section-title">Meet Lectere.</h2>
		
		<div class="definition">
			<p>
				Lectere is an AI assistant that appears inside any software and guides users visually on their real screen — showing exactly where to click and what to do without leaving the app.
			</p>
		</div>
		
		<div class="features-grid">
			<div class="feature-card">
				<div class="feature-icon">🎯</div>
				<h3>Real-time on-screen guidance</h3>
				<p>Visual highlights show exactly where to click</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">⚡</div>
				<h3>Auto-generated steps</h3>
				<p>AI creates workflows automatically</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">🔄</div>
				<h3>Cross-software intelligence</h3>
				<p>Works across any application</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">✨</div>
				<h3>Always-up-to-date workflows</h3>
				<p>Automatically adapts to UI changes</p>
			</div>
		</div>
	</div>
</section>

<style>
	.what-is {
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
	
	.definition {
		max-width: 800px;
		margin: 0 auto 5rem;
		text-align: center;
	}
	
	.definition p {
		font-size: 1.3rem;
		line-height: 1.8;
		color: #d0d0d0;
	}
	
	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.feature-card {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(155, 39, 76, 0.3);
		border-radius: 24px;
		padding: 2.5rem;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}
	
	.feature-card:hover {
		transform: translateY(-5px);
		border-color: rgba(235, 51, 110, 0.5);
		box-shadow: 0 0 40px rgba(155, 39, 76, 0.3);
	}
	
	.feature-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}
	
	.feature-card h3 {
		font-size: 1.4rem;
		margin-bottom: 1rem;
		color: #ffffff;
	}
	
	.feature-card p {
		color: #b0b0b0;
		line-height: 1.6;
	}
</style>
