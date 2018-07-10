package com.frame.common;

import java.util.HashMap;

@SuppressWarnings("all")
public class BaseMap<K,V> extends HashMap<K,V> {
	private static final long serialVersionUID = 5982395314541101022L;
	@Override
	public V put(K key, V value) {
		if(key instanceof String){
			key = (K) ((String) key).toLowerCase();
		}
		return super.put(key, value);
	}
	@Override
	public V remove(Object key) {
		if(key instanceof String){
			key = (K) ((String) key).toLowerCase();
		}
		return super.remove(key);
	}
}
