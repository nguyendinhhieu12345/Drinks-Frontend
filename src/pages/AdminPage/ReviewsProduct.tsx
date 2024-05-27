import { ArrowLeft } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { configRouter } from "@/configs/router"
import ProductDetailContent from "@/components/Product/ProductDetailContent"
import Reviews from "@/components/Product/Reviews"

function ReviewsProduct() {
    const nav = useNavigate()

    const handleRedirectProducts = () => {
        nav(configRouter.products)
    }

    return (
        <>
            <div className="flex items-center">
                <div
                    className="mr-3 cursor-pointer p-2 hover:bg-gray-300 rounded-full"
                    onClick={handleRedirectProducts}
                >
                    <ArrowLeft />
                </div>
                <p className="text-lg font-semibold">
                    Review Product
                </p>
            </div>
            <ProductDetailContent />
            <div className="border-b border-gray-200 py-8">
                <Reviews />
            </div>
        </>
    )
}

export default ReviewsProduct