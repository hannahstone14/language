import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box, Paper, Button } from '@mui/material';
import { FlashcardManager } from './components/FlashcardManager/FlashcardManager';
import { supabase } from './services/supabase';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

function App() {
  useEffect(() => {
    // Debug logging
    console.log('App mounted');
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    
    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('units')
          .select('*')
          .limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
        } else {
          console.log('Supabase connection successful:', data);
        }
      } catch (err) {
        console.error('Error testing Supabase connection:', err);
      }
    };

    testConnection();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box mb={4} textAlign="center">
            <Typography variant="h2" component="h1" gutterBottom>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Hangul Helper
              </Link>
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              Practice Korean writing with flashcards
            </Typography>
          </Box>

          <Routes>
            <Route
              path="/"
              element={
                <Box textAlign="center">
                  <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: '#ffffff' }}>
                    <Typography variant="h4" gutterBottom>
                      Available Units
                    </Typography>
                    <Box mt={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/units/lesson-8"
                        size="large"
                        sx={{ minWidth: 200 }}
                      >
                        Lesson 8
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              }
            />
            <Route
              path="/units/lesson-8"
              element={
                <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: '#ffffff' }}>
                  <FlashcardManager
                    unitId="lesson-8"
                    unitName="Lesson 8"
                  />
                </Paper>
              }
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
