DROP TABLE IF EXISTS packages;
CREATE TABLE packages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    duration TEXT NOT NULL,
    price REAL NOT NULL,
    original_price REAL,
    savings TEXT,
    status TEXT,
    type TEXT NOT NULL,
    popular BOOLEAN DEFAULT 0,
    best_value BOOLEAN DEFAULT 0
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    avatar TEXT,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending',
    date TEXT DEFAULT CURRENT_DATE
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    package_name TEXT,
    amount REAL NOT NULL,
    status TEXT DEFAULT 'Processing',
    date TEXT DEFAULT CURRENT_DATE,
    payment_method TEXT
);

-- Seed Data for Packages
INSERT INTO packages (id, name, duration, price, original_price, savings, status, type, popular, best_value) VALUES
('team_1_month', 'Team Invitation', '1 Month', 4.99, 12.99, '62%', 'Active', 'team_invitation', 0, 0),
('team_3_months', 'Team Invitation', '3 Months', 12.99, 38.97, '67%', 'Active', 'team_invitation', 1, 0),
('team_6_months', 'Team Invitation', '6 Months', 22.99, 77.94, '71%', 'Active', 'team_invitation', 0, 0),
('team_12_months', 'Team Invitation', '12 Months', 39.99, 155.88, '74%', 'Best Value', 'team_invitation', 0, 1),
('custom_1_month', 'Custom Email', '1 Month', 7.99, 12.99, '38%', 'Active', 'custom_email', 0, 0),
('custom_3_months', 'Custom Email', '3 Months', 19.99, 38.97, '49%', 'Active', 'custom_email', 1, 0),
('custom_6_months', 'Custom Email', '6 Months', 34.99, 77.94, '55%', 'Active', 'custom_email', 0, 0),
('custom_12_months', 'Custom Email', '12 Months', 59.99, 155.88, '62%', 'Best Value', 'custom_email', 0, 1);

-- Seed Data for Reviews
INSERT INTO reviews (id, name, role, avatar, content, rating, status, date) VALUES
('REV-001', 'Sarah Mitchell', 'Freelance Designer', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', 'Absolutely amazing service! Got my Canva Pro access within 5 minutes. The team invitation method works flawlessly.', 5, 'Approved', '2024-03-10'),
('REV-002', 'James Rodriguez', 'Marketing Manager', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 'Been using this for 6 months now. Saved so much money compared to the official subscription. Highly recommended!', 5, 'Approved', '2024-03-09'),
('REV-003', 'Emily Chen', 'Content Creator', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', 'The custom email upgrade kept all my designs intact. Customer support was super helpful when I had questions.', 4, 'Pending', '2024-03-09'),
('REV-004', 'Michael Foster', 'Small Business Owner', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', 'Best investment for my business. All premium features work perfectly. Will definitely renew!', 5, 'Approved', '2024-03-08'),
('REV-005', 'Lisa Thompson', 'Social Media Manager', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', 'Lightning fast delivery and excellent customer service. The background remover alone is worth it!', 5, 'Hidden', '2024-03-08');

-- Seed Data for Orders
INSERT INTO orders (id, customer_name, customer_email, package_name, amount, status, date, payment_method) VALUES
('ORD-001', 'Liam Johnson', 'liam@example.com', 'Team Invitation', 39.99, 'Completed', '2024-03-10', 'Credit Card'),
('ORD-002', 'Olivia Smith', 'olivia@example.com', 'Custom Email', 19.99, 'Processing', '2024-03-09', 'PayPal'),
('ORD-003', 'Noah Williams', 'noah@example.com', 'Team Invitation', 4.99, 'Completed', '2024-03-09', 'Credit Card'),
('ORD-004', 'Emma Brown', 'emma@example.com', 'Custom Email', 59.99, 'Failed', '2024-03-08', 'Credit Card'),
('ORD-005', 'Ava Jones', 'ava@example.com', 'Team Invitation', 22.99, 'Completed', '2024-03-08', 'PayPal');
