import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../models/product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{
            sx: {fontWeight: 'bold', color: 'primary.main'}
        }}
      />
      <CardMedia
        height='100'
        component="img"
        sx={{ objectFit: 'contain'}}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          Kr {(product.price/100).toFixed(2)} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
