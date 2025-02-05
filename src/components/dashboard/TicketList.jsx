import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const TicketList = ({ tickets, onView, onEdit, onDelete, role }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.description}</TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>{ticket.name}</TableCell>
              <TableCell>{ticket.department}</TableCell>
              <TableCell align="center">
                <Tooltip title="View">
                  <IconButton color="primary" onClick={() => onView(ticket)}>
                    <Visibility />
                  </IconButton>
                </Tooltip>
                {role === "support" && (
                  <Tooltip title="Edit">
                    <IconButton
                      color="secondary"
                      onClick={() => onEdit(ticket)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                )}
                {role === "customer" && (
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(ticket.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketList;
