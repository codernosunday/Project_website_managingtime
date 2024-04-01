const getHomepage = (req, res) => {

    return res.render('homepage.ejs');
}
const getlogin = (req, res) => {
    return res.render('login.ejs');
}
const getuserhomepage = (req, res) => {
    return res.render('userhomepage.ejs');
}
module.exports =
{
    getHomepage, getlogin, getuserhomepage
}
