/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.herodb.model;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author eriklarson-laptop
 */
public class SuperHuman {
    
    private int superHumanId;
    @NotEmpty(message = "You must supply a value for the Super Being's Name.")
    @Length(max = 20, message = "The Name cannot be any longer than 20 characters in length." )
    private String superHumanName;
    @NotEmpty (message = "You must supply a brief description about this Super Human.")
    @Length (max = 100, message = "The description cannot be more than 100 Characters long.")
    private String description;
    private List<Sighting> sightings;
    private List<Organization> organizations;
    private List<SuperPower> superPowers;
    

    public int getSuperHumanId() {
        return superHumanId;
    }

    public void setSuperHumanId(int superHumanId) {
        this.superHumanId = superHumanId;
    }

    public String getSuperHumanName() {
        return superHumanName;
    }

    public void setSuperHumanName(String superHumanName) {
        this.superHumanName = superHumanName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Sighting> getSightings() {
        return sightings;
    }

    public void setSightings(List<Sighting> sightings) {
        this.sightings = sightings;
    }

    public List<Organization> getOrganizations() {
        return organizations;
    }

    public void setOrganizations(List<Organization> organizations) {
        this.organizations = organizations;
    }

    public List<SuperPower> getSuperPowers() {
        return superPowers;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 47 * hash + this.superHumanId;
        hash = 47 * hash + Objects.hashCode(this.superHumanName);
        hash = 47 * hash + Objects.hashCode(this.description);
        hash = 47 * hash + Objects.hashCode(this.sightings);
        hash = 47 * hash + Objects.hashCode(this.organizations);
        hash = 47 * hash + Objects.hashCode(this.superPowers);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final SuperHuman other = (SuperHuman) obj;
        if (this.superHumanId != other.superHumanId) {
            return false;
        }
        if (!Objects.equals(this.superHumanName, other.superHumanName)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.sightings, other.sightings)) {
            return false;
        }
        if (!Objects.equals(this.organizations, other.organizations)) {
            return false;
        }
        if (!Objects.equals(this.superPowers, other.superPowers)) {
            return false;
        }
        return true;
    }

    public void setSuperPowers(List<SuperPower> superPowers) {
        this.superPowers = superPowers;
    }


    
}
