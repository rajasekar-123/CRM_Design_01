// Calendar Population
function initCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;
    
    // Simple mock calendar for September 2026
    const daysInMonth = 30;
    const startDay = 2; // Tuesday
    
    let html = '';
    
    // Empty slots for previous month
    for (let i = 0; i < startDay; i++) {
        html += `<div class="cal-day muted">${31 - startDay + i + 1}</div>`;
    }
    
    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
        if (i === 9) {
            html += `<div class="cal-day active">${i}</div>`;
        } else {
            html += `<div class="cal-day">${i}</div>`;
        }
    }
    
    // Empty slots for next month
    const totalSlots = 35; // 5 rows
    const remaining = totalSlots - (startDay + daysInMonth);
    for (let i = 1; i <= remaining; i++) {
        html += `<div class="cal-day muted">${i}</div>`;
    }
    
    calendarGrid.insertAdjacentHTML('beforeend', html);
}

// Chart Initialization
function initCharts() {
    // Common chart options
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = "#64748B";
    
    // 1. Revenue Chart (Line with gradient)
    const revCtx = document.getElementById('revenueChart');
    if (revCtx) {
        const gradientRevenue = revCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradientRevenue.addColorStop(0, 'rgba(67, 56, 202, 0.4)');
        gradientRevenue.addColorStop(1, 'rgba(67, 56, 202, 0.0)');
        
        const gradientSales = revCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradientSales.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
        gradientSales.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

        new Chart(revCtx, {
            type: 'line',
            data: {
                labels: ['1', '5', '10', '15', '20', '25', '30'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [1800, 2900, 2500, 3800, 3100, 5000, 4200],
                        borderColor: '#4338CA',
                        backgroundColor: gradientRevenue,
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#4338CA',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Sales',
                        data: [1200, 1800, 1500, 2400, 1900, 3200, 2600],
                        borderColor: '#3B82F6',
                        backgroundColor: gradientSales,
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, padding: 20 }
                    },
                    tooltip: {
                        backgroundColor: '#0F172A',
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    x: { grid: { display: false, drawBorder: false } },
                    y: { 
                        grid: { color: '#E2E8F0', drawBorder: false },
                        ticks: { callback: (value) => '$' + value }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
            }
        });
    }

    // 2. Sales Pipeline (Funnel using Bar)
    const funnelCtx = document.getElementById('funnelChart');
    if (funnelCtx) {
        new Chart(funnelCtx, {
            type: 'bar',
            data: {
                labels: ['Prospecting', 'Qualification', 'Proposal', 'Closed-Won'],
                datasets: [{
                    data: [100, 75, 40, 20],
                    backgroundColor: [
                        'rgba(67, 56, 202, 0.2)',
                        'rgba(67, 56, 202, 0.5)',
                        'rgba(67, 56, 202, 0.8)',
                        'rgba(67, 56, 202, 1)'
                    ],
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { grid: { display: false, drawBorder: false } }
                }
            }
        });
    }

    // 3. Service Ticket Status (Donut)
    const donutCtx = document.getElementById('donutChart');
    if (donutCtx) {
        new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Open', 'In Progress', 'On Hold', 'Resolved'],
                datasets: [{
                    data: [30, 45, 15, 10],
                    backgroundColor: ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { usePointStyle: true, padding: 15 }
                    }
                }
            }
        });
    }

    // 4. Rental Utilization (Bar)
    const barCtx = document.getElementById('barChart');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Equipment', 'Tools', 'Machinery'],
                datasets: [{
                    label: 'Utilization %',
                    data: [75, 88, 60],
                    backgroundColor: '#0F172A',
                    borderRadius: 4,
                    barThickness: 24
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false, drawBorder: false } },
                    y: { 
                        grid: { color: '#E2E8F0', drawBorder: false },
                        max: 100,
                        ticks: { callback: (value) => value + '%' }
                    }
                }
            }
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    initCharts();
    
    // Add simple hover interactions to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if(!item.classList.contains('ai-copilot')) {
                menuItems.forEach(mi => mi.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
});
