<section class="who-its-for">
	<div class="container">
		<h2 class="section-title">Built for the people software forgot.</h2>
		
		<div class="personas-grid">
			<div class="persona-card">
				<div class="persona-icon">🎓</div>
				<h3>Students</h3>
				<p>Learning complex software for coursework without getting stuck</p>
			</div>
			<div class="persona-card">
				<div class="persona-icon">👵</div>
				<h3>Elderly users</h3>
				<p>Navigating technology with confidence and independence</p>
			</div>
			<div class="persona-card">
				<div class="persona-icon">💼</div>
				<h3>Small business owners</h3>
				<p>Managing tools without technical expertise or support</p>
			</div>
		</div>
	</div>
</section>

<style>
	.who-its-for {
		padding: 8rem 2rem;
		background: linear-gradient(180deg, #15111a 0%, #1a1520 100%);
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
	
	.personas-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.persona-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(155, 39, 76, 0.3);
		border-radius: 24px;
		padding: 3rem 2rem;
		text-align: center;
		transition: all 0.3s ease;
	}
	
	.persona-card:hover {
		transform: translateY(-8px);
		border-color: rgba(235, 51, 110, 0.5);
		box-shadow: 0 12px 50px rgba(235, 51, 110, 0.2);
	}
	
	.persona-icon {
		font-size: 4rem;
		margin-bottom: 1.5rem;
	}
	
	.persona-card h3 {
		font-size: 1.6rem;
		margin-bottom: 1rem;
	}
	
	.persona-card p {
		color: #b0b0b0;
		line-height: 1.6;
		font-size: 1.1rem;
	}
</style>
