const defaultPresets = {
  Soyio: {
    name: 'Soyio',
    appearance: {
      theme: 'soyio',
    },
  },
  Night: {
    name: 'Night',
    appearance: {
      theme: 'night',
    },
  },
  Flat: {
    name: 'Flat',
    appearance: {
      theme: 'flat',
    },
  },
};

export const consentPresets = {
  ...defaultPresets,
  'Custom 1': {
    name: 'Custom 1',
    appearance: {
      config: {
        icon: {
          dataUseVariant: "outline"
        },
        brandTheme: "light"
      },
      variables: {
        colorPrimary: "#003058",
        fontFamily: "Open Sans, sans-serif",
        colorBorder: "#DEDEDE",
        borderRadius: "8px",
        colorBackground: "#ffffff",
        colorSurfaceMuted: "#F2F5F7",
        colorText: "#2E2E2E",
        colorLink: "var(--colorText)"
      },
      rules: {
        ".Label": {
          "color": "#2E2E2E"
        }
      }
    }
  },
  'Custom 2': {
    name: 'Custom 2',
    appearance: {
      theme: "soyio",
      config: {
        icon: {
          dataUseVariant: "solid"
        },
      },
      variables: {
        colorPrimary: "#E81E2B",
        colorSecondary: "#007DB7",
        fontFamily: "Ubuntu sans, sans-serif",
        borderRadius: "0.25rem",
        colorLink: "var(--colorSecondary)",
      },
      rules: {
        '.CheckboxInput': {
          borderRadius: "4px",
          borderColor: "rgba(0, 0, 0, 0.5)"
        },
        '.CheckboxInput--checked': {
          borderColor: "var(--colorSecondary)",
          backgroundColor: "var(--colorSecondary)"
        },
        '.CheckboxInput:focus-visible': {
          outline: "2px solid var(--colorSecondary)",
          outlineOffset: "2px"
        },
      }
    },
  },
  'Custom 3': {
    name: 'Custom 3',
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#ff7f0a',
        colorBackground: '#101012',
        fontFamily: 'Rubik',
        colorText: 'lab(65.6464 1.53497 -5.42429)',
        colorTextTitle: 'lab(90.6853% .399232 -1.45452)',
        colorSurfaceMuted: 'lab(15.7305% .613764 -2.16959)',
        colorLink: '#f60',
        colorBorder: 'lab(15.7305% .613764 -2.16959)',
      },
      rules: {
        '.MainContainer': {
          borderRadius: '.5rem',
        },
        '.Link': {
          fontWeight: '400',
        },
        '.Title': {
          color: 'var(--colorTextTitle)',
          fontWeight: '500',
        },
        '.Label': {
          color: 'var(--colorTextTitle)',
        },
        '.CategoryTag': {
          borderRadius: '2rem',
        }
      },
    },
  },
};

// All presets for Privacy Center (includes complex customizations)
export const privacyCenterPresets = {
  ...defaultPresets,
  'Custom 1': {
    name: 'Custom 1',
    appearance: {
      config: {
        mainPageColumns: 3,
        icon: {
          dataUseVariant: 'outline',
        },
      },
      variables: {
        colorPrimary: '#003058',
        fontFamily: 'Open Sans, sans-serif',
        colorBorder: '#DEDEDE',
        borderRadius: '8px',
        colorBackground: '#ffffff',
        colorSurfaceMuted: '#F2F5F7',
        colorText: '#2E2E2E',
        colorLink: 'var(--colorText)',
      },
      rules: {
        '.Card': {
          borderWidth: '1px',
          padding: '16px',
          borderRadius: '12px',
        },
        '.CardTitle': {
          letterSpacing: 'inherit',
          textTransform: 'none',
          color: 'var(--colorPrimary)',
          fontWeight: '600',
        },
        '.Button': {
          fontWeight: '600',
          padding: '12px 20px',
          borderRadius: '8px',
        },
        '.Label': {
          fontWeight: 'bold',
          color: '#2E2E2E',
          display: 'flex',
          justifyContent: 'space-between',
        },
        '.Input': {
          borderRadius: '8px',
        },
        '.Combobox': {
          borderRadius: '8px',
        },
        '.Select': {
          borderRadius: '8px',
        },
        '.StepTitle': {
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--colorPrimary)',
        },
        '.StepIndicator--active': {
          backgroundColor: 'var(--colorPrimary)',
        },
        '.StepIndicator--completed': {
          backgroundColor: 'var(--colorPrimary)',
          borderColor: 'var(--colorPrimary)',
        },
        '.StepIndicatorIcon': {
          color: 'white',
        },
        '.StepIndicatorDot': {
          backgroundColor: 'white',
        },
        '.RadioButton': {
          backgroundColor: 'white',
          borderWidth: '1px',
        },
        '.RadioIndicator': {
          backgroundColor: 'transparent',
          margin: '2px',
          height: '10px',
          width: '10px',
        },
        '.RadioButton--checked': {
          border: '1px solid var(--colorPrimary)',
        },
        '.RadioIndicator--checked': {
          backgroundColor: 'var(--colorPrimary)',
        },
        '.RadioCard:hover': {
          backgroundColor: 'rgba(242, 251, 255, .4)',
        },
        '.RadioCard--checked': {
          backgroundColor: '#F2F5F7',
        },
        '.Alert--info': {
          backgroundColor: '#F4FAFD',
          color: '#314951',
        },
      },
    },
  },
  'Custom 2': {
    name: 'Custom 2',
    appearance: {
      config: {
        helperTextPosition: 'bottom',
        iconRules: {
          Alert: {
            weight: 'fill',
          },
        },
        icon: {
          dataUseVariant: 'solid',
        },
      },
      variables: {
        colorPrimary: '#E81E2B',
        colorSecondary: '#007DB7',
        fontFamily: 'Ubuntu sans, sans-serif',
        borderRadius: '4px',
        colorSurfaceMuted: '#F6F6F6',
        borderWidth: '1px',
        colorBorder: '#E7E7E7',
        colorBackground: '#ffffff',
        colorSuccess: '#32A734',
        colorDanger: '#CC284E',
        colorInputFocus: 'var(--colorSecondary)',
        colorLink: 'var(--colorSecondary)',
        colorText: '#383838',
        colorSelectArrow: 'var(--colorSecondary)',
        dataUseIconColor: 'var(--colorText)',
      },
      rules: {
        '.Card': {
          padding: '24px 32px',
          borderRadius: '5px',
          borderWidth: '1px',
        },
        '.CardTitle': {
          letterSpacing: 'inherit',
          textTransform: 'none',
          fontWeight: '700',
        },
        '.Button': {
          fontWeight: 'medium',
          padding: '12px 24px',
          borderRadius: '4px',
          boxShadow: '0px 1px 2px rgba(30, 30, 30, 0.35)',
        },
        '.Label': {
          fontWeight: 'bold',
        },
        '.Input': {
          borderColor: '#646569',
        },
        '.Input--error': {
          borderColor: '#CC284E',
        },
        '.HintIcon': {
          color: '#00A1DF',
        },
        '.RadioButton': {
          border: '2px solid rgba(0, 0, 0, 0.5)',
          backgroundColor: 'transparent',
        },
        '.RadioIndicator': {
          backgroundColor: 'transparent',
        },
        '.RadioButton--checked': {
          border: '2px solid var(--colorSecondary)',
        },
        '.RadioIndicator--checked': {
          backgroundColor: 'var(--colorSecondary)',
        },
        '.RadioCard:hover': {
          backgroundColor: 'rgba(242, 251, 255, .4)',
        },
        '.RadioCard--checked': {
          border: '2px solid var(--colorSecondary)',
          backgroundColor: 'rgba(242, 251, 255, 1)',
        },
        '.RadioCardButton--checked': {
          border: '2px solid var(--colorSecondary)',
        },
        '.StepIndicator--active': {
          backgroundColor: 'var(--colorPrimary)',
        },
        '.StepIndicator--completed': {
          backgroundColor: 'white',
          borderColor: 'var(--colorPrimary)',
        },
        '.StepIndicatorIcon': {
          color: 'var(--colorPrimary)',
        },
        '.StepIndicatorDot': {
          backgroundColor: 'white',
        },
        '.TrackingCodeInputCell': {
          color: 'var(--colorText)',
        },
        '.Chip': {
          borderRadius: '4px',
          padding: '2px 8px',
        },
        '.Chip--green': {
          backgroundColor: '#CCF1C1',
          color: '#238805',
        },
        '.Chip--amber': {
          backgroundColor: '#F1E6AB',
          color: '#876820',
        },
        '.Chip--info': {
          backgroundColor: '#C0E9FD',
          color: '#0C6D9C',
        },
        '.Chip--red': {
          backgroundColor: '#F9D4D5',
          color: '#B00009',
        },
        '.Alert': {
          borderRadius: '4px',
          padding: '10px 12px',
        },
        '.Alert--info': {
          backgroundColor: '#C0E9FD',
          color: '#005D8F',
        },
        '.Switch': {
          gap: '8px',
        },
        '.SwitchRoot': {
          backgroundColor: '#A5A5A5',
          borderColor: '#A5A5A5',
          borderRadius: '2rem',
          boxShadow: 'none',
          height: '24px',
          width: '48px',
        },
        '.SwitchRoot--checked': {
          backgroundColor: 'var(--colorSecondary)',
          borderColor: 'var(--colorSecondary)',
        },
        '.SwitchThumb': {
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: '2rem',
          height: '18px',
          width: '18px',
          boxShadow: '0px 3px 1px 0px rgba(0,0,0,0.06), 0px 3px 8px 0px rgba(0,0,0,0.15);',
        },
        '.SwitchThumb--checked': {
          marginLeft: '2px',
        },
        '.SwitchIcon': {
          display: 'none',
        },
      },
    },
  },
  'Custom 3': {
    name: 'Custom 3',
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#ff7f0a',
        colorBackground: '#101012',
        fontFamily: 'Rubik',
        colorText: 'lab(65.6464 1.53497 -5.42429)',
        colorTextTitle: 'lab(90.6853% .399232 -1.45452)',
        colorSurfaceMuted: 'lab(15.7305% .613764 -2.16959)',
        colorLink: '#f60',
        colorBorder: 'lab(15.7305% .613764 -2.16959)',
      },
      rules: {
        '.MainContainer': {
          borderRadius: '.5rem',
        },
        '.Card': {
          border: '1px solid lab(15.7305% .613764 -2.16959)',
          backgroundColor: 'lab(8.30603% .618205 -2.16572)',
          borderRadius: '14px',
          transition: 'all .3s ease',
        },
        '.Card:hover': {
          transform: 'translate3d(0px, -2px, 0px)',
          backgroundColor: 'lab(15.7305% .613764 -2.16959)',
        },
        '.CardTitle': {
          letterSpacing: 'inherit',
          textTransform: 'none',
          fontWeight: '600',
        },
        '.Link': {
          fontWeight: '400',
        },
        '.Title': {
          color: 'var(--colorTextTitle)',
          fontWeight: '500',
        },
        '.Button': {
          fontWeight: '500',
          color: 'lab(98.26% 0 0)',
        },
        '.StepIndicator--active': {
          backgroundColor: 'var(--colorBackground)',
        },
        '.StepIndicator--pending': {
          backgroundColor: 'var(--colorSurfaceMuted)',
          borderColor: 'var(--colorSurfaceMuted)',
        },
        '.StepIndicator--completed': {
          backgroundColor: 'var(--colorSurfaceMuted)',
          borderColor: 'var(--colorSurfaceMuted)',
        },
        '.RadioCard': {
          backgroundColor: 'lab(8.30603% .618205 -2.16572)',
        },
        '.RadioCard:hover': {
          backgroundColor: 'lab(15.7305% .613764 -2.16959)',
        },
        '.RadioCard--checked': {
          backgroundColor: 'lab(15.7305% .613764 -2.16959)',
        },
        '.RadioButton': {
          backgroundColor: 'var(--colorBackground)',
        },
        '.Label': {
          color: 'var(--colorTextTitle)',
        },
        '.Input': {
          backgroundColor: 'lab(8.30603% .618205 -2.16572)',
          borderRadius: '.125rem',
          borderWidth: '1px',
          color: 'lab(65.6464% 1.53497 -5.42429)',
        },
      },
    },
  },
};

// Legacy export for backwards compatibility
export const presets = privacyCenterPresets;
