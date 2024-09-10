import AsyncStorage from '@react-native-async-storage/async-storage';

export async function readObject<T>(key: string, defaultValue: T): Promise<T> {
	const rawData = await AsyncStorage.getItem(key);
	if (rawData === null) {
		return defaultValue;
	}
	return JSON.parse(rawData);
}

export async function storeObject<T>(key: string, obj: T): Promise<void> {
	await AsyncStorage.setItem(key, JSON.stringify(obj));
}
