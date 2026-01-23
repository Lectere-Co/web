import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  Product: [
    { name: 'Features', path: '/product' },
    { name: 'Pricing', path: '/pricing' },
  ],
  Company: [
    { name: 'About', path: '/about' },
    { name: 'Solutions', path: '/solutions' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="container px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="group flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-2xl font-display font-medium text-gradient">
                Lectere
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Fighting digital displacement with AI-powered learning assistance.
              Built by students at Bellaire High School.
            </p>
            <p className="text-sm text-muted-foreground">
              A JA Social Innovation Challenge project
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Lectere. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in Houston, TX
          </p>
        </div>
      </div>
    </footer>
  );
}
