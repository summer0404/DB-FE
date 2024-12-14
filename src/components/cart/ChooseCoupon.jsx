import { useState, useEffect } from 'react';
import { getCoupons } from "../../api/coupon.api";
import { 
  Box, 
  Typography, 
  Card, 
  Grid, 
  Button,
  CircularProgress 
} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function ChooseCoupon({ onSelect }) {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                setLoading(true);
                const response = await getCoupons();
                setCoupons(response.data);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    const handleSelect = (coupon) => {
        setSelectedCoupon(coupon);
        if (onSelect) onSelect(coupon);
    };

    return (
        <Box sx={{
            background: "linear-gradient(to right, #0B0C10, #1F2833)",
            padding: 4
        }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    color: "#66FCF1", 
                    textAlign: "center", 
                    mb: 4,
                    fontWeight: "bold" 
                }}
            >
                CHỌN MÃ GIẢM GIÁ
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: "#66FCF1" }} />
                </Box>
            ) : (
                <Grid container spacing={3} sx={{ px: 2 }}>
                    {coupons.map((coupon) => (
                        <Grid item xs={12} sm={12} md={6} key={coupon.id}>
                            <Card 
                                sx={{
                                    bgcolor: selectedCoupon?.id === coupon.id ? '#45A29E' : '#1F2833',
                                    color: '#fff',
                                    p: 3,
                                    border: '1px solid #66FCF1',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    height: '100%', // Ensure consistent height
                                    minHeight: 200,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 4px 20px rgba(102, 252, 241, 0.2)'
                                    }
                                }}
                                onClick={() => handleSelect(coupon)}
                            >
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    mb: 2,
                                    width: '100%' 
                                }}>
                                    <LocalOfferIcon sx={{ color: '#66FCF1', mr: 2, flexShrink: 0 }} />
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            width: '100%',
                                            wordBreak: 'break-word'
                                        }}
                                    >
                                        {coupon.name}
                                    </Typography>
                                </Box>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        mb: 1,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Giảm: {coupon.percent}%
                                </Typography>
                    
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        color: '#8fd9d6', 
                                        mt: 2,
                                        display: 'block'
                                    }}
                                >
                                    Hết hạn: {new Date(coupon.expirationDate).toLocaleDateString()}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}