import {sladb, slent} from "./genSlubJSONLDSemanticProperties";

export const exhibitionClassIRI = sladb.Exhibition.value
export const exampleData = {
  '@id': slent['b7748b40-b15b-4a6d-8f13-e65088232080'].value,
  '@type': exhibitionClassIRI,
  'title': 'Otto Dix Ausstellung',
  'subtitle': 'Das neue Metrum',
  'description': 'Eine kontemporaere Ausstellung',
  'startDate': {
    'date': '2016-09-22',
    'modifier': 'AFTER'
  },
  'endDate': {
    'date': '2016-09-27',
    'modifier': 'AFTER'
  }
}
