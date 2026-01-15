// Employee and Department data structures
const departments = [
    {
        name: "Executive",
        employees: [
            { firstName: "Margaret", lastName: "Thompson" },
            { firstName: "Paul", lastName: "Anderson" }
        ]
    },
    {
        name: "Finance",
        employees: [
            { firstName: "Sarah", lastName: "Chen" },
            { firstName: "David", lastName: "Martinez" },
            { firstName: "Emily", lastName: "Johnson" }
        ]
    },
    {
        name: "Human Resources",
        employees: [
            { firstName: "Jennifer", lastName: "Williams" },
            { firstName: "Michael", lastName: "Brown" }
        ]
    },
    {
        name: "Operations",
        employees: [
            { firstName: "Robert", lastName: "Davis" },
            { firstName: "Lisa", lastName: "Garcia" },
            { firstName: "James", lastName: "Rodriguez" },
            { firstName: "Patricia", lastName: "Miller" }
        ]
    },
    {
        name: "Technology",
        employees: [
            { firstName: "Christopher", lastName: "Wilson" },
            { firstName: "Jessica", lastName: "Moore" },
            { firstName: "Daniel", lastName: "Taylor" }
        ]
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Populate navigation items
    const navItems = [
        { text: 'Home', url: '#home' },
        { text: 'Departments', url: '#departments' },
        { text: 'About', url: '#about' },
        { text: 'Contact', url: '#contact' }
    ];
    
    const navMenu = document.getElementById('nav-menu');
    
    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.textContent = item.text;
        a.href = item.url;
        
        li.appendChild(a);
        navMenu.appendChild(li);
    });
    
    // Populate employee directory
    const mainElement = document.getElementById('employee-list');
    
    departments.forEach(department => {
        // Create department section
        const departmentSection = document.createElement('section');
        departmentSection.className = 'department-section';
        
        // Create department header
        const departmentHeader = document.createElement('h2');
        departmentHeader.className = 'department-header';
        departmentHeader.textContent = department.name;
        
        // Create employee list
        const employeeUl = document.createElement('ul');
        employeeUl.className = 'employee-list';
        
        // Add each employee to the list
        department.employees.forEach(employee => {
            const employeeLi = document.createElement('li');
            const fullName = employee.lastName 
                ? `${employee.firstName} ${employee.lastName}`
                : employee.firstName;
            employeeLi.textContent = fullName;
            employeeUl.appendChild(employeeLi);
        });
        
        // Assemble the department section
        departmentSection.appendChild(departmentHeader);
        departmentSection.appendChild(employeeUl);
        
        // Add to main element
        mainElement.appendChild(departmentSection);
    });
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Search functionality
    document.getElementById('search-btn').addEventListener('click', performSearch);
    
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        
        if (!searchTerm) {
            // If search is empty, show all employees
            document.querySelectorAll('.employee-list li').forEach(li => {
                li.style.display = 'block';
            });
            document.querySelectorAll('.department-section').forEach(section => {
                section.style.display = 'block';
            });
            return;
        }
        
        // Search through employees
        document.querySelectorAll('.department-section').forEach(section => {
            const employees = section.querySelectorAll('.employee-list li');
            let hasVisibleEmployee = false;
            
            employees.forEach(li => {
                const employeeName = li.textContent.toLowerCase();
                if (employeeName.includes(searchTerm)) {
                    li.style.display = 'block';
                    hasVisibleEmployee = true;
                } else {
                    li.style.display = 'none';
                }
            });
            
            // Hide department if no employees match
            section.style.display = hasVisibleEmployee ? 'block' : 'none';
        });
    }
});
