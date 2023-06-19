import { EventEmitter } from '@angular/core';
export class PaginationService {
    constructor() {
        this.change = new EventEmitter();
        this.instances = {};
        this.DEFAULT_ID = 'DEFAULT_PAGINATION_ID';
    }
    defaultId() { return this.DEFAULT_ID; }
    /**
     * Register a PaginationInstance with this service. Returns a
     * boolean value signifying whether the instance is new or
     * updated (true = new or updated, false = unchanged).
     */
    register(instance) {
        if (instance.id == null) {
            instance.id = this.DEFAULT_ID;
        }
        if (!this.instances[instance.id]) {
            this.instances[instance.id] = instance;
            return true;
        }
        else {
            return this.updateInstance(instance);
        }
    }
    /**
     * Check each property of the instance and update any that have changed. Return
     * true if any changes were made, else return false.
     */
    updateInstance(instance) {
        let changed = false;
        for (let prop in this.instances[instance.id]) {
            if (instance[prop] !== this.instances[instance.id][prop]) {
                this.instances[instance.id][prop] = instance[prop];
                changed = true;
            }
        }
        return changed;
    }
    /**
     * Returns the current page number.
     */
    getCurrentPage(id) {
        if (this.instances[id]) {
            return this.instances[id].currentPage;
        }
        return 1;
    }
    /**
     * Sets the current page number.
     */
    setCurrentPage(id, page) {
        if (this.instances[id]) {
            let instance = this.instances[id];
            let maxPage = Math.ceil(instance.totalItems / instance.itemsPerPage);
            if (page <= maxPage && 1 <= page) {
                this.instances[id].currentPage = page;
                this.change.emit(id);
            }
        }
    }
    /**
     * Sets the value of instance.totalItems
     */
    setTotalItems(id, totalItems) {
        if (this.instances[id] && 0 <= totalItems) {
            this.instances[id].totalItems = totalItems;
            this.change.emit(id);
        }
    }
    /**
     * Sets the value of instance.itemsPerPage.
     */
    setItemsPerPage(id, itemsPerPage) {
        if (this.instances[id]) {
            this.instances[id].itemsPerPage = itemsPerPage;
            this.change.emit(id);
        }
    }
    /**
     * Returns a clone of the pagination instance object matching the id. If no
     * id specified, returns the instance corresponding to the default id.
     */
    getInstance(id = this.DEFAULT_ID) {
        if (this.instances[id]) {
            return this.clone(this.instances[id]);
        }
        return {};
    }
    /**
     * Perform a shallow clone of an object.
     */
    clone(obj) {
        var target = {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
        return target;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXBhZ2luYXRpb24vc3JjL2xpYi9wYWdpbmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUcxQyxNQUFNLE9BQU8saUJBQWlCO0lBQTlCO1FBRVcsV0FBTSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXpELGNBQVMsR0FBeUMsRUFBRSxDQUFDO1FBQ3JELGVBQVUsR0FBRyx1QkFBdUIsQ0FBQztJQXlHakQsQ0FBQztJQXZHVSxTQUFTLEtBQWEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQztJQUVyRDs7OztPQUlHO0lBQ0ksUUFBUSxDQUFDLFFBQTRCO1FBQ3hDLElBQUksUUFBUSxDQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDckIsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQztTQUNmO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssY0FBYyxDQUFDLFFBQTRCO1FBQy9DLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQzFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDbEI7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7T0FFRztJQUNJLGNBQWMsQ0FBQyxFQUFVO1FBQzVCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO1NBQ3pDO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSSxjQUFjLENBQUMsRUFBVSxFQUFFLElBQVk7UUFDMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3BCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyRSxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN4QjtTQUNKO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksYUFBYSxDQUFDLEVBQVUsRUFBRSxVQUFrQjtRQUMvQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsRUFBRTtZQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxlQUFlLENBQUMsRUFBVSxFQUFFLFlBQW9CO1FBQ25ELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksV0FBVyxDQUFDLEtBQWEsSUFBSSxDQUFDLFVBQVU7UUFDM0MsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekM7UUFDRCxPQUFPLEVBQXdCLENBQUM7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ssS0FBSyxDQUFDLEdBQVE7UUFDbEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2YsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN2QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RCO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcclxuaW1wb3J0IHtQYWdpbmF0aW9uSW5zdGFuY2V9IGZyb20gJy4vcGFnaW5hdGlvbi1pbnN0YW5jZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvblNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnN0YW5jZXM6IHsgW2lkOiBzdHJpbmddOiBQYWdpbmF0aW9uSW5zdGFuY2UgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBERUZBVUxUX0lEID0gJ0RFRkFVTFRfUEFHSU5BVElPTl9JRCc7XHJcblxyXG4gICAgcHVibGljIGRlZmF1bHRJZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5ERUZBVUxUX0lEIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGEgUGFnaW5hdGlvbkluc3RhbmNlIHdpdGggdGhpcyBzZXJ2aWNlLiBSZXR1cm5zIGFcclxuICAgICAqIGJvb2xlYW4gdmFsdWUgc2lnbmlmeWluZyB3aGV0aGVyIHRoZSBpbnN0YW5jZSBpcyBuZXcgb3JcclxuICAgICAqIHVwZGF0ZWQgKHRydWUgPSBuZXcgb3IgdXBkYXRlZCwgZmFsc2UgPSB1bmNoYW5nZWQpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXIoaW5zdGFuY2U6IFBhZ2luYXRpb25JbnN0YW5jZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChpbnN0YW5jZS5pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmlkID0gdGhpcy5ERUZBVUxUX0lEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlc1tpbnN0YW5jZS5pZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbaW5zdGFuY2UuaWRdID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUluc3RhbmNlKGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBlYWNoIHByb3BlcnR5IG9mIHRoZSBpbnN0YW5jZSBhbmQgdXBkYXRlIGFueSB0aGF0IGhhdmUgY2hhbmdlZC4gUmV0dXJuXHJcbiAgICAgKiB0cnVlIGlmIGFueSBjaGFuZ2VzIHdlcmUgbWFkZSwgZWxzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlSW5zdGFuY2UoaW5zdGFuY2U6IFBhZ2luYXRpb25JbnN0YW5jZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLmluc3RhbmNlc1tpbnN0YW5jZS5pZF0pIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlW3Byb3BdICE9PSB0aGlzLmluc3RhbmNlc1tpbnN0YW5jZS5pZF1bcHJvcF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2luc3RhbmNlLmlkXVtwcm9wXSA9IGluc3RhbmNlW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNoYW5nZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHBhZ2UgbnVtYmVyLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudFBhZ2UoaWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzW2lkXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZXNbaWRdLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgcGFnZSBudW1iZXIuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDdXJyZW50UGFnZShpZDogc3RyaW5nLCBwYWdlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZXNbaWRdKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2VzW2lkXTtcclxuICAgICAgICAgICAgbGV0IG1heFBhZ2UgPSBNYXRoLmNlaWwoaW5zdGFuY2UudG90YWxJdGVtcyAvIGluc3RhbmNlLml0ZW1zUGVyUGFnZSk7XHJcbiAgICAgICAgICAgIGlmIChwYWdlIDw9IG1heFBhZ2UgJiYgMSA8PSBwYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tpZF0uY3VycmVudFBhZ2UgPSBwYWdlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiBpbnN0YW5jZS50b3RhbEl0ZW1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUb3RhbEl0ZW1zKGlkOiBzdHJpbmcsIHRvdGFsSXRlbXM6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlc1tpZF0gJiYgMCA8PSB0b3RhbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2lkXS50b3RhbEl0ZW1zID0gdG90YWxJdGVtcztcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmFsdWUgb2YgaW5zdGFuY2UuaXRlbXNQZXJQYWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0SXRlbXNQZXJQYWdlKGlkOiBzdHJpbmcsIGl0ZW1zUGVyUGFnZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzW2lkXSkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tpZF0uaXRlbXNQZXJQYWdlID0gaXRlbXNQZXJQYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhlIHBhZ2luYXRpb24gaW5zdGFuY2Ugb2JqZWN0IG1hdGNoaW5nIHRoZSBpZC4gSWYgbm9cclxuICAgICAqIGlkIHNwZWNpZmllZCwgcmV0dXJucyB0aGUgaW5zdGFuY2UgY29ycmVzcG9uZGluZyB0byB0aGUgZGVmYXVsdCBpZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEluc3RhbmNlKGlkOiBzdHJpbmcgPSB0aGlzLkRFRkFVTFRfSUQpOiBQYWdpbmF0aW9uSW5zdGFuY2Uge1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlc1tpZF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUodGhpcy5pbnN0YW5jZXNbaWRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHt9IGFzIFBhZ2luYXRpb25JbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBlcmZvcm0gYSBzaGFsbG93IGNsb25lIG9mIGFuIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbG9uZShvYmo6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IG9ialtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=