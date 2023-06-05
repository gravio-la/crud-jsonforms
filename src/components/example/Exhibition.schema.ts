export default {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "DataImport": {
      "type": "object",
      "properties": {
        "importTime": {
          "type": "string",
          "format": "date-time"
        },
        "remarks": {
          "type": "string"
        },
        "status": {
          "type": "string",
          "maxLength": 1,
          "enum": [
            "0",
            "1",
            "2"
          ]
        }
      }
    },
    "Tag": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        },
        "parent": {
          "$ref": "#/definitions/Tag"
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "Authority": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        }
      }
    },
    "SeriesType": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        }
      }
    },
    "ExhibitionSeries": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        },
        "parent": {
          "$ref": "#/definitions/ExhibitionSeries"
        },
        "seriesType": {
          "$ref": "#/definitions/SeriesType"
        },
        "fromDate": {
          "type": "integer"
        },
        "fromType": {
          "type": "integer"
        },
        "toDate": {
          "type": "integer"
        },
        "toType": {
          "type": "integer"
        },
        "openingDate": {
          "type": "string",
          "format": "date"
        },
        "timeSeries": {
          "type": "string",
          "maxLength": 200
        },
        "location": {
          "$ref": "#/definitions/Location"
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        },
        "tags": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Tag"
          }
        }
      }
    },
    "Person": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 200
        },
        "nameVariants": {
          "type": "string",
          "maxLength": 2000
        },
        "gender": {
          "type": "string",
          "maxLength": 1,
          "enum": [
            "m",
            "f",
            "d",
            "u"
          ]
        },
        "description": {
          "type": "string"
        },
        "birthDate": {
          "type": "integer"
        },
        "deathDate": {
          "type": "integer"
        },
        "profession": {
          "type": "string",
          "maxLength": 200
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        },
        "externalId": {
          "type": "string",
          "maxLength": 50
        },
        "memberOfCorp": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Corporation"
          }
        }
      }
    },
    "Workplace": {
      "type": "object",
      "properties": {
        "person": {
          "$ref": "#/definitions/Person"
        },
        "location": {
          "$ref": "#/definitions/Location"
        },
        "fromDate": {
          "type": "integer"
        },
        "toDate": {
          "type": "integer"
        }
      }
    },
    "Location": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "titleVariants": {
          "type": "string",
          "maxLength": 600
        },
        "description": {
          "type": "string"
        },
        "parent": {
          "$ref": "#/definitions/Location"
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "Role": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        },
        "roleType": {
          "type": "integer"
        }
      }
    },
    "Place": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "titleVariants": {
          "type": "string",
          "maxLength": 600
        },
        "description": {
          "type": "string"
        },
        "location": {
          "$ref": "#/definitions/Location"
        },
        "parent": {
          "$ref": "#/definitions/Place"
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "EventType": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "tags": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Tag"
          }
        }
      }
    },
    "Corporation": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 200
        },
        "nameVariants": {
          "type": "string",
          "maxLength": 600
        },
        "description": {
          "type": "string"
        },
        "parent": {
          "$ref": "#/definitions/Corporation"
        },
        "location": {
          "$ref": "#/definitions/Location"
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "ResourceType": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        }
      }
    },
    "Resource": {
      "type": "object",
      "properties": {
        "ressourceType": {
          "$ref": "#/definitions/ResourceType"
        },
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        },
        "ppn": {
          "type": "string",
          "format": "uri"
        },
        "doi": {
          "type": "string",
          "format": "uri"
        },
        "url": {
          "type": "string",
          "format": "uri"
        },
        "signature": {
          "type": "string",
          "maxLength": 200
        }
      }
    },
    "ExponatsAndPersons": {
      "type": "object",
      "properties": {
        "exponat": {
          "$ref": "#/definitions/ExhibitionExponat"
        },
        "person": {
          "$ref": "#/definitions/Person"
        },
        "role": {
          "$ref": "#/definitions/Role"
        }
      }
    },
    "ExponatsAndCorporations": {
      "type": "object",
      "properties": {
        "exponat": {
          "$ref": "#/definitions/ExhibitionExponat"
        },
        "corporation": {
          "$ref": "#/definitions/Corporation"
        },
        "role": {
          "$ref": "#/definitions/Role"
        }
      }
    },
    "ExhibitionExponat": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 500
        },
        "titleVariants": {
          "type": "string",
          "maxLength": 600
        },
        "description": {
          "type": "string"
        },
        "externalId": {
          "type": "string",
          "maxLength": 200
        },
        "fromDate": {
          "type": "integer"
        },
        "fromType": {
          "type": "integer"
        },
        "fromDateDisplay": {
          "type": "string",
          "maxLength": 200
        },
        "toDate": {
          "type": "integer"
        },
        "toType": {
          "type": "integer"
        },
        "toDateDisplay": {
          "type": "string",
          "maxLength": 200
        },
        "url": {
          "type": "string",
          "format": "uri"
        },
        "signature": {
          "type": "string",
          "maxLength": 200
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        },
        "exponatGenres": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Genre"
          }
        },
        "involvedPersons": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ExponatsAndPersons"
          }
        },
        "involvedCorporations": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ExponatsAndCorporations"
          }
        },
        "resources": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Resource"
          }
        }
      }
    },
    "ExhibitionCategory": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "OtherDate": {
      "type": "object",
      "properties": {
        "exhibition": {
          "$ref": "#/definitions/Exhibition"
        },
        "dateValue": {
          "type": "string",
          "maxLength": 8
        },
        "dateType": {
          "type": "integer"
        }
      }
    },
    "InvolvedPerson": {
      "type": "object",
      "properties": {
        "exhibition": {
          "$ref": "#/definitions/Exhibition"
        },
        "person": {
          "$ref": "#/definitions/Person"
        },
        "role": {
          "$ref": "#/definitions/Role"
        }
      }
    },
    "InvolvedCorporation": {
      "type": "object",
      "properties": {
        "exhibition": {
          "$ref": "#/definitions/Exhibition"
        },
        "corporation": {
          "$ref": "#/definitions/Corporation"
        },
        "role": {
          "$ref": "#/definitions/Role"
        }
      }
    },
    "ExhibitionWebLink": {
      "type": "object",
      "properties": {
        "exhibition": {
          "$ref": "#/definitions/Exhibition"
        },
        "weblink": {
          "type": "string",
          "format": "uri"
        }
      }
    },
    "Genre": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "Exhibition": {
      "type": "object",
      "properties": {
        "externalId": {
          "type": "string",
          "maxLength": 50
        },
        "exhibitionType": {
          "$ref": "#/definitions/EventType"
        },
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "subtitle": {
          "type": "string",
          "maxLength": 200
        },
        "originalTitle": {
          "type": "string",
          "maxLength": 200
        },
        "description": {
          "type": "string"
        },
        "exhibitionSeries": {
          "$ref": "#/definitions/ExhibitionSeries"
        },
        "exhibitionCategory": {
          "$ref": "#/definitions/ExhibitionCategory"
        },
        "exhibitionGenre": {
          "$ref": "#/definitions/Genre"
        },
        "sourceCorporation": {
          "$ref": "#/definitions/Corporation"
        },
        "fromDate": {
          "type": "integer"
        },
        "fromType": {
          "type": "integer"
        },
        "fromDateDisplay": {
          "type": "string",
          "maxLength": 200
        },
        "toDate": {
          "type": "integer"
        },
        "toType": {
          "type": "integer"
        },
        "toDateDisplay": {
          "type": "string",
          "maxLength": 200
        },
        "published": {
          "type": "boolean"
        },
        "editorNote": {
          "type": "string",
          "maxLength": 300
        },
        "authority": {
          "$ref": "#/definitions/Authority"
        },
        "idAuthority": {
          "type": "string",
          "maxLength": 50
        },
        "lastNormUpdate": {
          "type": "string",
          "format": "date-time"
        },
        "involvedCorporations": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InvolvedCorporation"
          }
        },
        "places": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Place"
          }
        },
        "locations": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Location"
          }
        },
        "tags": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Tag"
          }
        },
        "involvedPersons": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InvolvedPerson"
          }
        },
        "exponats": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ExhibitionExponat"
          }
        },
        "resources": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Resource"
          }
        }
      }
    }
  }
}
