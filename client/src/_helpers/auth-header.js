export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

// account roles and permissions
exports.isAccountOwner = (user) => (user && user.role <= 1);
exports.isAccountAdmin = (user) => (user && user.role <= 5);

// role to text
exports.roleToText = (role) => ((role<=1) ? 'Owner' : ((role<=5) ? 'Admin' : 'Member'));
