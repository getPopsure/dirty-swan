import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  Address,
  isPartialAddressValid,
  countryNameFromAlphaCode,
} from "@popsure/public-models";

import styles from "./style.module.scss";

import styledMapType from "./mapStyle";

const GERMANY_LAT_LNG = { lat: 51.54317, lng: 10.3181503 };

const MAP_CONFIG_OBJ = {
  zoom: 6,
  center: GERMANY_LAT_LNG,
  fullscreenControl: false,
  mapTypeControl: false,
  panControl: false,
  zoomControl: false,
  streetViewControl: false,
  scrollwheel: false,
  scaleControl: false,
  rotateControl: false,
  draggable: false,
};

export const geocoderAddressComponentToPartialAddress = (
  input: google.maps.GeocoderAddressComponent[]
): Partial<Address> => {
  interface MappedType {
    key: keyof Address;
    value: "long_name" | "short_name";
  }

  const mapping: {
    route: MappedType;
    street_number: MappedType;
    postal_code: MappedType;
    locality: MappedType;
    country: MappedType;
  } = {
    route: {
      key: "street",
      value: "long_name",
    },
    street_number: {
      key: "houseNumber",
      value: "long_name",
    },
    postal_code: {
      key: "postcode",
      value: "long_name",
    },
    locality: {
      key: "city",
      value: "long_name",
    },
    country: {
      key: "country",
      value: "short_name",
    },
  };

  const toReturn: Partial<Address> = {};
  input.forEach((value) => {
    const type = value.types[0] as keyof typeof mapping;
    const mappedValue = mapping[type];
    if (mappedValue) {
      toReturn[mappedValue.key] = value[mappedValue.value];
    }
  });

  return toReturn;
};

const AutoCompleteAddress = ({
  address,
  onAddressChange,
}: {
  address?: Address;
  onAddressChange: (address: Partial<Address>) => void;
}) => {
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);
  const autocompleteElement = useRef<HTMLInputElement | null>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [
    houseNumberIsMissingOnGeocoderAddress,
    setHouseNumberIsMissingOnGeocoderAddress,
  ] = useState(false);

  const onPlaceChanged = () => {
    const newPlace = autocomplete.current?.getPlace();
    if (newPlace && newPlace.geometry) {
      const geocoderAddress = geocoderAddressComponentToPartialAddress(
        newPlace.address_components!
      );

      setPlace(newPlace);
      onAddressChange(geocoderAddress);
      setHouseNumberIsMissingOnGeocoderAddress(
        geocoderAddress.houseNumber === undefined
      );

      map.current?.panTo(newPlace.geometry.location);
      map.current?.setZoom(15);

      marker.current?.setPosition(newPlace.geometry.location);
    }
  };

  useEffect(() => {
    const reference = document.getElementById(
      "autocomplete"
    ) as HTMLInputElement;
    autocomplete.current = new google.maps.places.Autocomplete(reference, {
      types: ["address"],
      componentRestrictions: { country: "de" },
    });
    autocomplete.current.addListener("place_changed", onPlaceChanged);
    if (address && isPartialAddressValid(address)) {
      reference.value = `${address.street} ${address.houseNumber}, ${
        address.city
      }, ${countryNameFromAlphaCode(address.country)}`;
    }

    map.current = new google.maps.Map(
      document.getElementById("map")!,
      MAP_CONFIG_OBJ
    );
    map.current?.mapTypes.set("styled_map", styledMapType);
    map.current?.setMapTypeId("styled_map");

    marker.current = new google.maps.Marker({
      map: map.current,
    });
  }, []); // eslint-disable-line

  return (
    <>
      <div
        id="map"
        className={classNames(`ws8 ${styles.map}`, {
          [styles["map--hidden"]]: place === null,
        })}
      />
      <div className={styles["input-container"]}>
        <div
          className={`${styles["input-wrapper"]} ${
            houseNumberIsMissingOnGeocoderAddress ? "ws5" : "ws8"
          }`}
        >
          <input
            className="p-input"
            id="autocomplete"
            data-cy="autocomplete"
            type="text"
            ref={autocompleteElement}
            onChange={() => {
              onAddressChange({});
            }}
          />
        </div>
        <div
          className={`${styles["input-wrapper"]} ${
            houseNumberIsMissingOnGeocoderAddress
              ? "ws3"
              : styles["input-wrapper--hidden"]
          }`}
        >
          <input
            className="p-input"
            data-cy="autocomplete-house-number"
            placeholder="House Number"
            value={address?.houseNumber || ""}
            onChange={({ target: { value } }) => {
              onAddressChange({ ...address, houseNumber: value });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AutoCompleteAddress;
