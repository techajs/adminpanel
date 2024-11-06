const { default: Breadcrumb } = require("@/components/Breadcrumbs/Breadcrumb")
const { default: LayoutPage } = require("@/components/Layouts/layout")

const TransactionPage = () =>{
    return (
        <LayoutPage >
            <Breadcrumb pageName={`Transaction List`} />
        </LayoutPage>
    )
}

export default TransactionPage