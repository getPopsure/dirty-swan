import { useEffect, useMemo, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[]

export interface LoadScriptUrlOptions {
  googleMapsApiKey: string | ""
  googleMapsClientId?: string | undefined
  language?: string | undefined
  region?: string | undefined
  mapIds?: string[] | undefined
  authReferrerPolicy?: 'origin' | undefined
}

export interface UseLoadScriptOptions extends LoadScriptUrlOptions {
  id?: string | undefined
  nonce?: string | undefined
}

const id = 'script-loader'
const version = 'weekly'
const libraries: Libraries = ['places']

export function useJsApiLoader({
  nonce,
  googleMapsApiKey,
  language,
  region,
  mapIds,
  authReferrerPolicy,
}: UseLoadScriptOptions): {
  isLoaded: boolean
  loadError: Error | undefined
} {
  const isMounted = useRef(false)
  const [isLoaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState<Error | undefined>(undefined)

  useEffect(function trackMountedState() {
    isMounted.current = true
    return (): void => {
      isMounted.current = false
    }
  }, [])

  const loader = useMemo(function memo() {
    return new Loader({
      id,
      apiKey: googleMapsApiKey,
      version,
      libraries,
      language,
      region,
      mapIds,
      nonce,
      authReferrerPolicy,
    })
  }, [googleMapsApiKey, language, region, mapIds, nonce, authReferrerPolicy])

  useEffect(function effect() {
    if (isLoaded) {
      return
    } else {
      loader.load().then(function then() {
        if (isMounted.current) setLoaded(true)
      })
      .catch(function onrejected(error) {
        setLoadError(error)
      })
    }
  }, [])

  return { isLoaded, loadError }
}