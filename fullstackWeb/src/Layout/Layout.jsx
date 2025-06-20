import './Layout.css'
function Layout({children}){
return(
    <div className="styleChildren">
        {children[0]}
        {children[1]}
    </div>
)
}
export default Layout