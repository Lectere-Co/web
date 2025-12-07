<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<div class="logo">Lectere</div>
				<p>Software that teaches you while you use it.</p>
			</div>
			
			<div class="footer-links">
				<div class="link-group">
					<h4>Product</h4>
					<a href="#features">Features</a>
					<a href="#demo">Demo</a>
					<a href="#pricing">Pricing</a>
				</div>
				<div class="link-group">
					<h4>Company</h4>
					<a href="#about">About</a>
					<a href="#contact">Contact</a>
					<a href="#careers">Careers</a>
				</div>
				<div class="link-group">
					<h4>Legal</h4>
					<a href="#privacy">Privacy</a>
					<a href="#terms">Terms</a>
				</div>
			</div>
		</div>
		
		<div class="footer-bottom">
			<p>© 2024 Lectere. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: linear-gradient(180deg, #1a1520 0%, #0a0a0f 100%);
		border-top: 1px solid rgba(155, 39, 76, 0.3);
		padding: 5rem 2rem 2rem;
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.footer-content {
		display: grid;
		grid-template-columns: 2fr 3fr;
		gap: 4rem;
		max-width: 1200px;
		margin: 0 auto 3rem;
	}
	
	.footer-brand .logo {
		font-size: 2rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--razzmatazz), var(--amaranth-purple));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
	}
	
	.footer-brand p {
		color: #888;
		line-height: 1.6;
	}
	
	.footer-links {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}
	
	.link-group h4 {
		margin-bottom: 1rem;
		font-size: 1.1rem;
		color: var(--razzmatazz);
	}
	
	.link-group a {
		display: block;
		color: #888;
		text-decoration: none;
		margin-bottom: 0.75rem;
		transition: color 0.2s ease;
	}
	
	.link-group a:hover {
		color: var(--razzmatazz);
	}
	
	.footer-bottom {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		color: #666;
	}
	
	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
		
		.footer-links {
			grid-template-columns: 1fr;
		}
	}
</style>
