DO $$
DECLARE home_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pages WHERE slug = '') THEN
    INSERT INTO pages (title, slug, nav_label, nav_order, show_in_nav, published)
    VALUES ('Home', '', 'Home', 0, false, true) RETURNING id INTO home_id;
    INSERT INTO sections (page_id, type, sort_order, content) VALUES
      (home_id,'hero',0,'{"eyebrow":"Uniforms for remarkable hospitality","title":"Dress the experience.","intro":"Bespoke restaurant uniforms that translate your identity into every gesture, every service, every detail.","image":"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1500&q=85","ctaLabel":"Explore the collection","ctaHref":"#collections"}'::jsonb),
      (home_id,'statement',1,'{"eyebrow":"The first impression","title":"Your team is the face of your restaurant.","body":"We create uniforms with the same care you bring to your menu: considered materials, precise construction, and a point of view guests remember."}'::jsonb),
      (home_id,'collection_grid',2,'{"eyebrow":"The collection","title":"Every role, one identity.","items":[{"title":"Front of house","text":"Elegant tailoring with the freedom to move.","image":"https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85"},{"title":"Kitchen","text":"Technical performance, refined down to the seam.","image":"https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1200&q=85"},{"title":"Bar & lounge","text":"Distinctive silhouettes for after-dark service.","image":"https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85"}]}'::jsonb),
      (home_id,'process',3,'{"eyebrow":"Our process","title":"From your world to their wardrobe.","items":[{"title":"Discover","text":"We learn your concept, space, service style, and practical needs."},{"title":"Design","text":"We develop silhouettes, palettes, details, and a complete visual direction."},{"title":"Refine","text":"Samples are fitted, tested in service, and perfected with your team."},{"title":"Deliver","text":"Production, quality control, sizing, and global delivery—managed end to end."}]}'::jsonb),
      (home_id,'contact',4,'{"eyebrow":"Begin a collaboration","title":"Let''s create something your guests will remember.","intro":"Tell us about your project."}'::jsonb);
  END IF;
END $$;
