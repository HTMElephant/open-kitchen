import { Card, Typography, CardContent, Grid, Button } from "@mui/material";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/API";
import AppContext from "../../context/AppContext";

const Kitchens = () => {
  const [usersKitchens, setUsersKitchens] = useState([]);
  const { loggedInUser } = useContext(AppContext);
  const [isCreateKitchenModelOpen, setIsCreateKitchenModelOpen] =
    useState(false);

  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const getKitchens = async () => {
      if (loggedInUser.id) {
        const response = await api.get(
          `/v1/users/${loggedInUser.id}/kitchens`
        );
        setUsersKitchens(response.data);
      }
    };
    getKitchens();
  }, [loggedInUser.id]);

  return (
    <div className="kitchens-display">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {usersKitchens.map((kitchen) => (
          <Grid item xs={6} md={6} key={kitchen.id}>
            <Card
              onClick={() => handleNavigate(`/kitchens/${kitchen.id}`)}
              className="kitchen-card"
            >
              <Typography variant="h6">{kitchen.name}</Typography>
              <CardContent className="content">
                <Typography variant="body2" color="text.secondary">
                  Kitchen Role: {kitchen.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button size="large" onClick={() => setIsCreateKitchenModelOpen(true)}>
        Create Kitchen <SoupKitchenOutlinedIcon />
      </Button>
    </div>
  );
};

export default Kitchens;
