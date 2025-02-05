import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useForm from "../../hooks/useForm";

const TicketDialog = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEdit,
  isView,
  role,
}) => {
  const validate = (field, value) => {
    switch (field) {
      case "name":
        return value ? undefined : "Name is required";
      case "title":
        return value ? undefined : "Title is required";
      case "description":
        return value ? undefined : "Description is required";
      case "priority":
        return value ? undefined : "Priority is required";
      case "category":
        return value ? undefined : "Category is required";
      case "email":
        return value &&
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? undefined
          : "Enter a valid email address";
      case "phone":
        return value && /^[0-9]{10}$/.test(value)
          ? undefined
          : "Enter a valid 10-digit phone number";
      case "date":
        return value ? undefined : "Date is required";
      default:
        return undefined;
    }
  };
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
  } = useForm(initialData, validate);

  useEffect(() => {
    setValues(initialData);
  }, [initialData, setValues]);

  const isCustomer = role === "customer";
  const isSupportAgent = role === "support";

  const disableField = (fieldName) => {
    if (isView) return true;
    if (isSupportAgent && isEdit) {
      return !["department", "status"].includes(fieldName);
    }
    if (isCustomer) {
      return ["department", "status"].includes(fieldName);
    }
    return false;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}
      >
        {isView ? "View Ticket" : isEdit ? "Edit Ticket" : "Add Ticket"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              disabled={disableField("name")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              disabled={disableField("title")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description}
              disabled={disableField("description")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Department"
              name="department"
              value={values.department}
              onChange={handleChange}
              error={!!errors.department}
              helperText={errors.department}
              disabled={disableField("department")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            >
              <MenuItem value="Yet to Assign">Yet to Assign</MenuItem>
              <MenuItem value="Engineering Department">
                Engineering Department
              </MenuItem>
              <MenuItem value="HR Department">HR Department</MenuItem>
              <MenuItem value="Operation Department">
                Operation Department
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={values.status}
              onChange={handleChange}
              error={!!errors.status}
              helperText={errors.status}
              disabled={disableField("status")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              error={!!errors.priority}
              helperText={errors.priority}
              disabled={disableField("priority")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={values.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
              disabled={disableField("category")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={disableField("email")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              disabled={disableField("phone")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Date"
              value={values.date}
              onChange={(newDate) => setValues({ ...values, date: newDate })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!errors.date}
                  helperText={errors.date}
                  disabled={disableField("date")}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.terms}
                  onChange={(e) =>
                    setValues({ ...values, terms: e.target.checked })
                  }
                  name="terms"
                  color="primary"
                  disabled={disableField("terms")}
                />
              }
              label="Agree to terms and conditions"
              sx={{ marginLeft: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarks"
              name="remarks"
              value={values.remarks}
              onChange={handleChange}
              multiline
              rows={3}
              disabled={disableField("remarks")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      {!isView && (
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={(e) =>
              handleSubmit(e, (vals) => {
                onSubmit(vals);
              })
            }
            disabled={isSubmitting}
            sx={{
              backgroundColor: "#3f51b5",
              "&:hover": { backgroundColor: "#303f9f" },
            }}
          >
            {isEdit ? "Save Changes" : "Add Ticket"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default TicketDialog;
