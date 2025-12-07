<section class="pricing">
	<div class="container">
		<h2 class="section-title">Simple pricing.</h2>
		
		<div class="pricing-grid">
			<div class="pricing-card">
				<h3>Essential</h3>
				<div class="price">
					<span class="amount">$12</span>
					<span class="period">/month</span>
				</div>
				<div class="price-alt">or $99/year</div>
				<ul class="features-list">
					<li>Up to 100 guided workflows</li>
					<li>Basic analytics</li>
					<li>Email support</li>
				</ul>
				<button class="btn-primary">Get Started</button>
			</div>
			
			<div class="pricing-card featured">
				<div class="badge">MOST POPULAR</div>
				<h3>Professional</h3>
				<div class="price">
					<span class="amount">$39</span>
					<span class="period">/month per user</span>
				</div>
				<div class="price-alt"> </div>
				<ul class="features-list">
					<li>Unlimited workflows</li>
					<li>Advanced analytics</li>
					<li>Priority support</li>
					<li>Custom integrations</li>
				</ul>
				<button class="btn-primary">Start Free Trial</button>
			</div>
		</div>
	</div>
</section>

<style>
	.pricing {
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
	
	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
		max-width: 900px;
		margin: 0 auto;
	}
	
	.pricing-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(155, 39, 76, 0.3);
		border-radius: 24px;
		padding: 3rem 2rem;
		text-align: center;
		transition: all 0.3s ease;
		position: relative;
	}
	
	.pricing-card.featured {
		border-color: var(--razzmatazz);
		border-width: 2px;
		box-shadow: 0 0 40px rgba(235, 51, 110, 0.3);
		transform: scale(1.05);
	}
	
	.pricing-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 50px rgba(235, 51, 110, 0.3);
	}
	
	.pricing-card.featured:hover {
		transform: scale(1.05) translateY(-5px);
	}
	
	.badge {
		position: absolute;
		top: -15px;
		left: 50%;
		transform: translateX(-50%);
		background: linear-gradient(135deg, var(--razzmatazz), var(--amaranth-purple));
		padding: 0.5rem 1.5rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.05em;
	}
	
	.pricing-card h3 {
		font-size: 1.8rem;
		margin-bottom: 1.5rem;
	}
	
	.price {
		margin-bottom: 0.5rem;
	}
	
	.amount {
		font-size: 3.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--razzmatazz), var(--amaranth-purple));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.period {
		font-size: 1rem;
		color: #888;
	}
	
	.price-alt {
		color: #888;
		margin-bottom: 2rem;
		min-height: 1.5rem;
	}
	
	.features-list {
		list-style: none;
		margin: 2rem 0;
		text-align: left;
	}
	
	.features-list li {
		padding: 0.75rem 0;
		color: #d0d0d0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}
	
	.features-list li::before {
		content: '✓ ';
		color: var(--razzmatazz);
		font-weight: bold;
		margin-right: 0.5rem;
	}
	
	.pricing-card button {
		width: 100%;
		margin-top: 1.5rem;
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
</style>
