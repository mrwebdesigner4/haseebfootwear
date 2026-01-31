// Shop Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loadMoreBtn = document.getElementById('load-more-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');
    const shownCountElement = document.getElementById('shown-count');
    const totalCountElement = document.getElementById('total-count');
    const totalProductsElement = document.getElementById('total-products');
    
    if (loadMoreBtn) {
        // Initial setup
        const totalProducts = productCards.length;
        let visibleCount = 6;
        
        // Hide all products beyond initial 6
        productCards.forEach((card, index) => {
            if (index >= 6) {
                card.style.display = 'none';
            }
        });
        
        // Set counts
        if (totalCountElement) {
            totalCountElement.textContent = totalProducts;
        }
        
        if (shownCountElement) {
            shownCountElement.textContent = Math.min(visibleCount, totalProducts);
        }
        
        if (totalProductsElement) {
            totalProductsElement.textContent = totalProducts;
        }
        
        // Load More Functionality
        loadMoreBtn.addEventListener('click', function() {
            // Show next 6 products
            const startIndex = visibleCount;
            const endIndex = Math.min(visibleCount + 6, totalProducts);
            
            for (let i = startIndex; i < endIndex; i++) {
                if (productCards[i]) {
                    productCards[i].style.display = 'block';
                }
            }
            
            visibleCount += 6;
            
            // Update count
            if (shownCountElement) {
                shownCountElement.textContent = Math.min(visibleCount, totalProducts);
            }
            
            // Hide button if all products are shown
            if (visibleCount >= totalProducts) {
                loadMoreBtn.style.display = 'none';
            }
            
            // Smooth scroll to newly loaded products
            if (endIndex < totalProducts) {
                const lastVisibleCard = productCards[endIndex - 1];
                if (lastVisibleCard) {
                    lastVisibleCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
        
        // Product Filter Tabs
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                let visibleInCategory = 0;
                
                // Show/hide products based on category
                productCards.forEach((card, index) => {
                    const cardCategories = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategories.includes(category)) {
                        card.style.display = index < 6 ? 'block' : 'none';
                        visibleInCategory++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Update counts
                if (shownCountElement) {
                    shownCountElement.textContent = Math.min(6, visibleInCategory);
                }
                
                // Show/hide load more button
                if (visibleInCategory > 6) {
                    loadMoreBtn.style.display = 'inline-flex';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
                
                // Reset visible count for load more
                visibleCount = 6;
            });
        });
    }
    
    // Mobile menu functionality - FIXED VERSION
    const navToggle = document.getElementById('nav-toggle');
    
    if (navToggle) {
        // Try multiple selectors for hamburger button
        const hamburger = document.querySelector('.hamburger, .menu-toggle, [for="nav-toggle"], label[for="nav-toggle"]');
        
        // Close mobile menu when clicking outside - IMPROVED VERSION
        document.addEventListener('click', function(event) {
            const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper, .mobile-menu, .nav-menu-mobile');
            const navToggleLabel = document.querySelector('label[for="nav-toggle"]');
            
            // Check if click is inside mobile menu or on hamburger/label
            const isClickInsideMenu = mobileMenuWrapper?.contains(event.target);
            const isClickOnToggle = navToggleLabel?.contains(event.target) || 
                                   (hamburger && hamburger.contains(event.target)) ||
                                   event.target === navToggle;
            
            if (!isClickInsideMenu && !isClickOnToggle && navToggle.checked) {
                navToggle.checked = false;
            }
        });
        
        // Close menu when clicking on a link
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a, .nav-mobile a, [class*="mobile"] a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.checked = false;
            });
        });
        
        // Additional safety: Close menu on window resize (if needed)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navToggle.checked) {
                navToggle.checked = false;
            }
        });
    }
});
