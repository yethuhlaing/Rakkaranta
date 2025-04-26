import pandas as pd
import numpy as np
from scipy import stats
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import streamlit as st
from sklearn.ensemble import IsolationForest

# Set Streamlit page config
st.set_page_config(page_title="Sensor Data Dashboard with ML", layout="wide")

# Load the dataset from CSV
df = pd.read_csv('sensor_history_2025-04-14.csv')
df_full = df.copy()

# Convert Timestamp to datetime format
df_full['Timestamp'] = pd.to_datetime(df_full['Timestamp'])

# Handle Distance column: convert numeric values to float, set non-numeric to NaN
df_full['Distance_Numeric'] = pd.to_numeric(df_full['Distance'], errors='coerce')
df_full['Distance_Numeric'] = df_full['Distance_Numeric'].fillna(5)

# Sidebar for filters
st.sidebar.header("Filters")
status_options = ['All'] + list(df_full['Status'].unique())
selected_status = st.sidebar.selectbox("Select Status", status_options)
time_range = st.sidebar.slider(
    "Select Time Range",
    min_value=df_full['Timestamp'].min().to_pydatetime(),
    max_value=df_full['Timestamp'].max().to_pydatetime(),
    value=(df_full['Timestamp'].min().to_pydatetime(), df_full['Timestamp'].max().to_pydatetime())
)

# Filter data based on selections
df_filtered = df_full.copy()
if selected_status != 'All':
    df_filtered = df_filtered[df_filtered['Status'] == selected_status]
df_filtered = df_filtered[
    (df_filtered['Timestamp'] >= pd.to_datetime(time_range[0])) &
    (df_filtered['Timestamp'] <= pd.to_datetime(time_range[1]))
]

# Main title
st.title("Sensor Data Analysis Dashboard with Machine Learning")

# Calculate basic statistics for Humidity and Temperature
stats_summary = {
    'Humidity': {
        'Mean': df_filtered['Humidity'].mean(),
        'Median': df_filtered['Humidity'].median(),
        'Mode': stats.mode(df_filtered['Humidity'], keepdims=True).mode[0] if not df_filtered['Humidity'].empty else None,
        'Std': df_filtered['Humidity'].std()
    },
    'Temperature': {
        'Mean': df_filtered['Temperature'].mean(),
        'Median': df_filtered['Temperature'].median(),
        'Mode': stats.mode(df_filtered['Temperature'], keepdims=True).mode[0] if not df_filtered['Temperature'].empty else None,
        'Std': df_filtered['Temperature'].std()
    }
}

# Display statistics summary
st.header("Statistics Summary")
st.table(pd.DataFrame(stats_summary))

# Calculate and display correlation matrix
correlation = df_filtered[['Humidity', 'Temperature']].corr(method='pearson')
st.header("Correlation Matrix")
st.table(correlation)

# Machine Learning: Anomaly Detection with Isolation Forest
st.header("Anomaly Detection (Isolation Forest)")
features = ['Humidity', 'Temperature', 'Distance_Numeric']
X = df_filtered[features].dropna()  # Drop NaN for ML
if not X.empty:
    # Train Isolation Forest
    iso_forest = IsolationForest(contamination=0.1, random_state=42)
    df_filtered['Anomaly'] = pd.Series(np.nan, index=df_filtered.index)
    df_filtered.loc[X.index, 'Anomaly'] = iso_forest.fit_predict(X)
    # Anomaly = -1 (outlier), 1 (normal)
    anomalies = df_filtered[df_filtered['Anomaly'] == -1][['Timestamp', 'Humidity', 'Temperature', 'Distance', 'Status']]
else:
    anomalies = pd.DataFrame(columns=['Timestamp', 'Humidity', 'Temperature', 'Distance', 'Status'])
    st.write("No data available for anomaly detection after filtering.")

# Display anomalies
if not anomalies.empty:
    st.table(anomalies)
else:
    st.write("No anomalies detected.")

# Create scatter plot with anomaly highlighting
st.header("Humidity vs. Temperature Scatter Plot (with Anomalies)")
fig_scatter = px.scatter(
    df_filtered,
    x='Humidity',
    y='Temperature',
    color='Status',
    size='Distance_Numeric',
    title='Humidity vs. Temperature',
    labels={'Humidity': 'Humidity (%)', 'Temperature': 'Temperature (°C)'},
    hover_data=['Timestamp', 'Distance', 'Status', 'Anomaly'],
    size_max=10
)
# Highlight anomalies
if not anomalies.empty:
    fig_scatter.add_scatter(
        x=anomalies['Humidity'],
        y=anomalies['Temperature'],
        mode='markers',
        marker=dict(symbol='x', size=12, color='black', line=dict(width=2)),
        name='Anomalies',
        hoverinfo='skip'
    )
fig_scatter.update_layout(
    xaxis_title="Humidity (%)",
    yaxis_title="Temperature (°C)",
    legend_title="Status",
    showlegend=True
)
st.plotly_chart(fig_scatter, use_container_width=True)

# Create time series plot with dual y-axes
st.header("Humidity and Temperature Time Series")
fig_time = make_subplots(specs=[[{"secondary_y": True}]])
fig_time.add_trace(
    go.Scatter(
        x=df_filtered['Timestamp'],
        y=df_filtered['Humidity'],
        name='Humidity',
        mode='lines+markers',
        marker=dict(color='blue'),
        hovertemplate='Timestamp: %{x}<br>Humidity: %{y}%<br>Distance: %{customdata[0]}<br>Status: %{customdata[1]}',
        customdata=df_filtered[['Distance', 'Status']]
    ),
    secondary_y=False
)
fig_time.add_trace(
    go.Scatter(
        x=df_filtered['Timestamp'],
        y=df_filtered['Temperature'],
        name='Temperature',
        mode='lines+markers',
        marker=dict(color='red'),
        hovertemplate='Timestamp: %{x}<br>Temperature: %{y}°C<br>Distance: %{customdata[0]}<br>Status: %{customdata[1]}',
        customdata=df_filtered[['Distance', 'Status']]
    ),
    secondary_y=True
)
fig_time.update_layout(
    xaxis_title='Timestamp',
    legend_title='Variable',
    hovermode='x unified'
)
fig_time.update_yaxes(title_text='Humidity (%)', secondary_y=False)
fig_time.update_yaxes(title_text='Temperature (°C)', secondary_y=True)
st.plotly_chart(fig_time, use_container_width=True)

# Optional: Display raw data
st.header("Filtered Raw Data (Optional)")
if st.checkbox("Show raw data"):
    st.dataframe(df_filtered)