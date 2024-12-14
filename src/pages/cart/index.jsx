import { useParams } from "react-router-dom";
import CartPage from "../../components/cart/CartPage";

export default function Cart() {
    const { id } = useParams(); 
    return (
        <CartPage movieId={id}/>
    );
}