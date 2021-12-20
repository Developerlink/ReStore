import { useState } from "react";
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
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import styles from "./ProductCard.module.css";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = (productId: number) => {
    setIsLoading(true);
    agent.Basket.addItem(productId)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        height="100"
        component="img"
        sx={{ objectFit: "contain" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          Kr {(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={isLoading}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button size="small">
          <Link className={styles.link} to={product.id.toString()}>
            View
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
