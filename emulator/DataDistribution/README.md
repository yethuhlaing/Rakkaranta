# Sensor Data Analysis Dashboard Documentation

## Project Overview

This project develops an interactive data analysis dashboard to process and visualize sensor data from `sensor_history_2025-04-14.csv`. The data, likely collected by a Raspberry Pi Pico with an ultrasonic sensor (e.g., HC-SR04), includes humidity (`Humidity`), temperature (`Temperature`), distance (`Distance`), and status (`Status`). Built with Python and Streamlit, the dashboard provides:

- **Basic Statistical Analysis**: Mean, median, mode, and standard deviation for humidity and temperature.
- **Correlation Analysis**: Pearson correlation coefficient, visualized via scatter plot.
- **Outlier Detection**: Identifies anomalies using Z-score method.
- **Time Series Visualization**: Shows humidity and temperature trends over time.
- **Interactive Dashboard**: Features filters for status and time range, dynamically updating charts and tables.

The dashboard helps users explore data, identify patterns, and detect issues like frequent "Out of range" statuses.

## Data Description

**File**: `sensor_history_2025-04-14.csv`

**Columns**:
- `Timestamp`: Measurement time (e.g., `2025-04-13T22:07:04.320Z`).
- `Humidity`: Relative humidity (%).
- `Temperature`: Temperature (°C).
- `Distance`: Distance measurement (numeric, e.g., `64.78`, or text, e.g., "Out of range").
- `Status`: Sensor status (e.g., "OK", "Out of range").

**Characteristics**:
- ~400 records, from 2025-04-13 22:07 to 2025-04-14 13:01.
- Humidity: ~43% to 50%; Temperature: ~23°C to 24°C.
- `Distance` has mixed types, requiring preprocessing.
- Frequent "Out of range" statuses indicate potential sensor limitations.

## Program Structure

The program (`datarelationships.py`) processes data, performs analyses, and renders a dashboard. Key components:

1. **Data Preprocessing**:
   - Loads CSV using Pandas.
   - Converts `Timestamp` to datetime.
   - Processes `Distance`: numeric values to floats, non-numeric (e.g., "Out of range") set to 5 for visualization.

2. **Statistical Analysis**:
   - Computes mean, median, mode (via SciPy), and standard deviation for `Humidity` and `Temperature`.
   - Displays results in a table.

3. **Correlation Analysis**:
   - Calculates Pearson correlation between `Humidity` and `Temperature`.
   - Visualizes with Plotly Express scatter plot:
     - x-axis: Humidity (%).
     - y-axis: Temperature (°C).
     - Color: `Status` (e.g., green for "OK", red for "Out of range").
     - Size: Numeric `Distance` (non-numeric as 5).
     - Hover: `Timestamp`, `Distance`, `Status`.

4. **Outlier Detection**:
   - Uses Z-score (threshold = 3) to identify anomalies in `Humidity` and `Temperature`.
   - Outputs table with all columns for outliers.

5. **Time Series Visualization**:
   - Dual y-axis Plotly chart:
     - Left y-axis: Humidity (%, blue line+markers).
     - Right y-axis: Temperature (°C, red line+markers).
     - x-axis: Timestamp.
     - Hover: `Distance`, `Status`.
   - Unified hover mode for synchronized inspection.

6. **Interactive Dashboard**:
   - Streamlit-based web interface.
   - Features:
     - **Sidebar Filters**:
       - `Status` dropdown: "All", "OK", "Out of range", etc.
       - Time range slider: Earliest to latest timestamp.
     - **Displays**:
       - Statistics table.
       - Correlation matrix.
       - Scatter plot.
       - Time series plot.
       - Outlier table.
       - Optional raw data table (via checkbox).
   - Updates dynamically with filter changes.

## Dependencies

- **Pandas**: Data manipulation.
- **NumPy**: Numerical computations.
- **SciPy**: Mode calculation.
- **Plotly**: Interactive charts.
- **Streamlit**: Web dashboard.
