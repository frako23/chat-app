export const login = (req, res) => {
    res.send("loginUser")
    console.log("login");
}

export const logout = (req, res) => {
    res.send("loginUser")
    console.log("logout");
}

export const signup = async (req, res) => {
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body
    } catch (error) {
        
    }
}