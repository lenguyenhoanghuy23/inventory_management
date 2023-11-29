import { action, observable } from "mobx";

class provOrgStore {
    @observable selectedValues!: number ;
    @observable selectedlabel!: string ;
    @observable selectedNameUser!: any ;
    @observable selectDisplay!: string
    @action
    setSelectedValues(values: number) {
      return  this.selectedValues = values;
    }
    @action
    setSelectedLabel(label: string) {
      return  this.selectedlabel = label;
    }
    @action
    setSelectedNameUser(label: any) {
      return  this.selectedNameUser = label;
    }
    setDisplay(display:string){
      this.selectDisplay = display ;
    }
    
}

export default provOrgStore;