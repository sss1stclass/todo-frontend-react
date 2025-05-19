import { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  IconButton, 
  Tooltip, 
  Typography,
  Modal,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import moment from 'moment';

const TodoCards = ({ items, deleteTodo, updateTodo }: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        key={items?.id}
        onClick={handleOpen}
        sx={{
          minWidth: {xs:300, sm:470},
          position: 'relative',
          mt: 2,
          backgroundColor: items?.completed == 1 ? '#e8f5e9' : 'background.paper',
          boxShadow: items?.completed == 1 ? '0px 2px 4px -1px rgba(76,175,80,0.2), 0px 4px 5px 0px rgba(76,175,80,0.14), 0px 1px 10px 0px rgba(76,175,80,0.12)' : 'primary',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: items?.completed == 1
              ? '0px 5px 5px -3px rgba(76,175,80,0.2), 0px 8px 10px 1px rgba(76,175,80,0.14), 0px 3px 14px 2px rgba(76,175,80,0.12)'
              : '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)'
          }
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                textDecoration: items?.completed == 1 ? 'line-through' : 'none',
                color: items?.completed == 1 ? 'text.secondary' : 'text.primary'
              }}
            >
              {items.title || 'this is Title'}
            </Typography>
            <Tooltip title="Delete">
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(items?.id);
                }} 
                size="small" 
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{
              textDecoration: items?.completed == 1 ? 'line-through' : 'none'
            }}
          >
            {items.description || 'this is the descriptions of works'}
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, pt: 0, mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            size="small"
            variant="outlined"
            color="success"
            disabled={items?.completed == 1}
            endIcon={<DoneAllIcon />}
            onClick={(e) => {
              e.stopPropagation();
              updateTodo(items?.id);
            }}
          >
            {items?.completed == 1 ? 'Already Done' : 'Completed'}
          </Button>
          <Typography variant="caption">
            {moment.utc(items?.created_at).local().format('LLL')}
          </Typography>
        </Box>
      </Card>

      {/* Modal for showing todo details */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="todo-details-modal"
        aria-describedby="todo-details-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '70%', md: '50%' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          outline: 'none'
        }}>
          <Stack spacing={2}>
            <Typography variant="h5" component="h2">
              Todo Details
            </Typography>
            
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                Title
              </Typography>
              <Typography variant="body1" sx={{ 
                textDecoration: items?.completed == 1 ? 'line-through' : 'none',
                color: items?.completed == 1 ? 'text.secondary' : 'text.primary'
              }}>
                {items.title || 'No title'}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1" sx={{ 
                textDecoration: items?.completed == 1 ? 'line-through' : 'none'
              }}>
                {items.description || 'No description'}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                Status
              </Typography>
              <Typography variant="body1">
                {items?.completed == 1 ? 'Completed' : 'Pending'}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                Created At
              </Typography>
              <Typography variant="body1">
                {moment.utc(items?.created_at).local().format('LLL')}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button 
                variant="outlined" 
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(items?.id);
                  handleClose();
                }}
              >
                Delete
              </Button>
              <Button 
                variant="contained" 
                color="success"
                disabled={items?.completed == 1}
                onClick={(e) => {
                  e.stopPropagation();
                  updateTodo(items?.id);
                  handleClose();
                }}
                endIcon={<DoneAllIcon />}
              >
                {items?.completed == 1 ? 'Already Done' : 'Mark as Completed'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default TodoCards