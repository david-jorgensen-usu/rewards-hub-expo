import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { showNotification } from "../utils/Notifications";

export const GEOFENCE_TASK_NAME = "GEOFENCE_TASK";

// --- Your company list ---
const COMPANIES = [
  { id: 1, name: "Old Main", lat: 41.740833, lng: -111.813056, trigger_radius: 100 },
  { id: 2, name: "Merrill-Cazier Library", lat: 41.7410, lng: -111.8085, trigger_radius: 100 },
  { id: 3, name: "Natural Resources Building", lat: 41.7424, lng: -111.8080, trigger_radius: 100 },
  { id: 4, name: "Ray B. West Building", lat: 41.7435, lng: -111.8090, trigger_radius: 100 },
  { id: 5, name: "Dee Glen Smith Spectrum", lat: 41.74768, lng: -111.81200, trigger_radius: 150 },
  { id: 6, name: "Kachow", lat: 41.74395899238067, lng: -111.81567194271624, trigger_radius: 40 },
  { id: 7, name: "Geology Building", lat: 41.7450, lng: -111.8085, trigger_radius: 100 },
  { id: 8, name: "Quinney Library / Research Library", lat: 41.74339, lng: -111.80975, trigger_radius: 100 },
  { id: 9, name: "Morty's", lat: 41.744289, lng: -111.815131, trigger_radius: 15 },
  // Test / placeholder buildings
  { id: 10, name: "Test Building A", lat: 41.7400, lng: -111.8100, trigger_radius: 100 },
  { id: 11, name: "Test Building B", lat: 41.7415, lng: -111.8115, trigger_radius: 100 },
  { id: 12, name: "Test Building C", lat: 41.7425, lng: -111.8125, trigger_radius: 100 },
  { id: 13, name: "Test Building D", lat: 41.7430, lng: -111.8130, trigger_radius: 100 },
  { id: 14, name: "Test Building E", lat: 41.7440, lng: -111.8140, trigger_radius: 100 },
  { id: 15, name: "Test Building F", lat: 41.7450, lng: -111.8150, trigger_radius: 100 },
  { id: 16, name: "Test Building G", lat: 41.7460, lng: -111.8160, trigger_radius: 100 },
  { id: 17, name: "Test Building H", lat: 41.7470, lng: -111.8170, trigger_radius: 100 },
  { id: 18, name: "Test Building I", lat: 41.7480, lng: -111.8180, trigger_radius: 100 },
  { id: 19, name: "Test Building J", lat: 41.7490, lng: -111.8190, trigger_radius: 100 },
  { id: 20, name: "Test Building K", lat: 41.7500, lng: -111.8200, trigger_radius: 100 }
];

// --- Helper: Haversine formula ---
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// --- Define background task ---
TaskManager.defineTask(GEOFENCE_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Geofence task error:", error);
    return;
  }
  if (!data?.locations?.length) return;

  const { latitude, longitude } = data.locations[0].coords;

  for (const company of COMPANIES) {
    const distance = getDistance(latitude, longitude, company.lat, company.lng);
    if (distance <= company.trigger_radius) {
      const key = `lastNotif_${company.id}`;
      const last = await AsyncStorage.getItem(key);
      const now = Date.now();

      if (!last || now - parseInt(last, 10) > 1000 * 60 * 60) { // 1 hour
        // Send notification
        showNotification({
          title: `Nearby: ${company.name}`,
          body: `You are close to ${company.name}!`,
          data: { companyId: company.id },
        });
        // Save timestamp
        await AsyncStorage.setItem(key, now.toString());
      }
    }
  }
});

// --- Start geofencing ---
export async function startGeofencing() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();

  if (status !== "granted" || bgStatus !== "granted") {
    console.log("Location permissions not granted");
    return;
  }

  await Location.startLocationUpdatesAsync(GEOFENCE_TASK_NAME, {
    accuracy: Location.Accuracy.Highest,
    distanceInterval: 50, // every 50 meters
    timeInterval: 10000, // ~10s
    showsBackgroundLocationIndicator: false,
    foregroundService: {
      notificationTitle: "Location Active",
      notificationBody: "Tracking your location for nearby rewards",
      notificationColor: "#2255EB",
    },
  });

  console.log("✅ Geofencing started with 1-notification-per-hour limit");
}
