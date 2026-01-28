'use server'

import { query } from '@/lib/db'

// Packages
export async function getPackages() {
    return await query(`SELECT * FROM packages ORDER BY price ASC`);
}

export async function createPackage(pkg) {
    const { id, name, duration, price, original_price = null, savings = null, status = 'Active', type, popular = 0, best_value = 0 } = pkg;
    await query(
        `INSERT INTO packages (id, name, duration, price, original_price, savings, status, type, popular, best_value) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, duration, price, original_price, savings, status, type, popular, best_value]
    );
}

export async function deletePackage(id) {
    await query(`DELETE FROM packages WHERE id = ?`, [id]);
}

// Reviews
export async function getReviews() {
    return await query(`SELECT * FROM reviews ORDER BY date DESC`);
}

export async function approveReview(id) {
    await query(`UPDATE reviews SET status = 'Approved' WHERE id = ?`, [id]);
}

export async function hideReview(id) {
    await query(`UPDATE reviews SET status = 'Hidden' WHERE id = ?`, [id]);
}

export async function deleteReview(id) {
    await query(`DELETE FROM reviews WHERE id = ?`, [id]);
}

// Orders
export async function getOrders() {
    return await query(`SELECT * FROM orders ORDER BY date DESC`);
}

export async function refundOrder(id) {
    await query(`UPDATE orders SET status = 'Refunded' WHERE id = ?`, [id]);
}
