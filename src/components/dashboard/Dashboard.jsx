import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Skeleton } from "@mui/lab";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useUserContext } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import TemporaryDrawer from "../sidebar/Sidebar";
import TicketList from "./TicketList";
import TicketDialog from "./TicketDialog";

const initialFormData = {
  name: "",
  title: "",
  description: "",
  department: "Yet to Assign",
  priority: "",
  category: "",
  email: "",
  phone: "",
  date: null,
  terms: false,
  status: "Pending",
  file: null,
  remarks: "",
};

function getToday() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); 
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const userContext = useUserContext();
  const navigate = useNavigate();
  const role = userContext?.user?.role;
  const userEmail = userContext?.user?.email;

  useEffect(() => {
    if (!userContext?.user) {
      navigate("/");
    }
  }, [userContext, navigate]);

  useEffect(() => {
    if (userContext?.user) {
      const fetchTickets = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(db, "tickets"));
          const ticketData = querySnapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          setTickets(ticketData);
        } catch (error) {
          console.error("Error fetching tickets: ", error);
        } finally {
          setLoading(false); 
        }
      };
      fetchTickets();
    }
  }, [userContext?.user, role, userEmail]);

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      if (isEdit) {
        const ticketRef = doc(db, "tickets", values.id);
        await updateDoc(ticketRef, values);
      } else {
        values.date = getToday();
        await addDoc(collection(db, "tickets"), values);
      }
      setDialogOpen(false);
      setFormData(initialFormData);
      alert("Ticket processed successfully!");
      const querySnapshot = await getDocs(collection(db, "tickets"));
      const ticketData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setTickets(ticketData);
    } catch (error) {
      console.error("Error processing ticket: ", error);
    }
    setLoading(false)

  };

  const handleAdd = () => {
    setFormData(initialFormData);
    setIsEdit(false);
    setIsView(false);
    setDialogOpen(true);
  };

  const handleEdit = (ticket) => {
    setFormData(ticket);
    setIsEdit(true);
    setIsView(false);
    setDialogOpen(true);
  };

  const handleView = (ticket) => {
    setFormData(ticket);
    setIsView(true);
    setIsEdit(false);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tickets", id));
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error("Error deleting ticket: ", error);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setIsEdit(false);
    setIsView(false);
    setFormData(initialFormData);
  };

  return (
    <Box
      sx={{
        maxWidth: "1100px",
        padding: "20px",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <TemporaryDrawer />
        Tickets Management
      </Typography>
      <Card sx={{ marginTop: 3, padding: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h5">Tickets List</Typography>
            {role === "customer" && (
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{
                  backgroundColor: "#4caf50",
                  "&:hover": { backgroundColor: "#45a049" },
                }}
              >
                Add Ticket
              </Button>
            )}
          </Box>
          {loading ? (
            <>
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={100} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={150}
                sx={{ mt: 2 }}
              />
            </>
          ) : (
            <TicketList
              tickets={tickets}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              role={role}
            />
          )}
        </CardContent>
      </Card>
      <TicketDialog
        open={dialogOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={formData}
        isEdit={isEdit}
        isView={isView}
        role={role}
        loading={loading}
      />
    </Box>
  );
};

export default Dashboard;
